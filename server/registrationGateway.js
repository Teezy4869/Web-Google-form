import { buildGalaFormPayload, GALA_GOOGLE_FORM_CONFIG } from '../src/services/googleForm.js';

const FORM_PATH = new URL(GALA_GOOGLE_FORM_CONFIG.viewUrl).pathname.replace(/\/viewform$/, '');
const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };

const json = (status, body) => Response.json(body, { status, headers: JSON_HEADERS });

const googlePage = (url) => {
  const location = new URL(url);
  if (location.hostname !== 'docs.google.com' || !location.pathname.startsWith(`${FORM_PATH}/`)) return 'unknown';
  if (location.pathname === `${FORM_PATH}/closedform`) return 'closed';
  if (location.pathname === `${FORM_PATH}/viewform`) return 'open';
  if (location.pathname === `${FORM_PATH}/formResponse`) return 'response';
  return 'unknown';
};

export const readPublishedFormStatus = async (fetchGoogle = fetch) => {
  try {
    const response = await fetchGoogle(`${GALA_GOOGLE_FORM_CONFIG.viewUrl}?hl=en`, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000)
    });
    if (!response.ok) return 'unavailable';
    const page = googlePage(response.url);
    if (page === 'closed') return 'closed';
    if (page !== 'open') return 'unavailable';
    const html = await response.text();
    return html.includes(`action="${GALA_GOOGLE_FORM_CONFIG.actionUrl}?hl=en"`) ? 'open' : 'unavailable';
  } catch {
    return 'unavailable';
  }
};

const validSubmission = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const required = ['fullName', 'school', 'studentId', 'className', 'phone', 'email', 'facebook'];
  if (required.some((field) => typeof data[field] !== 'string' || !data[field].trim() || data[field].length > 500)) return false;
  if (data.school === '__other_option__' && (typeof data.schoolOther !== 'string' || !data.schoolOther.trim() || data.schoolOther.length > 500)) return false;
  if (data.school !== '__other_option__' && data.school !== 'Đại học Kinh tế Quốc dân') return false;
  if (data.note != null && (typeof data.note !== 'string' || data.note.length > 2000)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
};

export const handleRegistrationRequest = async (request, fetchGoogle = fetch) => {
  if (request.method === 'GET') {
    const status = await readPublishedFormStatus(fetchGoogle);
    return status === 'unavailable'
      ? json(503, { status: 'status_error', message: 'Chưa kiểm tra được trạng thái Google Form. Vui lòng thử lại.' })
      : json(200, { status });
  }

  if (request.method !== 'POST') return json(405, { status: 'error', message: 'Phương thức không được hỗ trợ.' });
  if (!request.headers.get('content-type')?.includes('application/json')) return json(415, { status: 'error', message: 'Dữ liệu gửi không hợp lệ.' });
  if (Number(request.headers.get('content-length')) > 12_000) return json(413, { status: 'error', message: 'Dữ liệu gửi quá dài.' });

  let data;
  try {
    const body = await request.text();
    if (body.length > 12_000) return json(413, { status: 'error', message: 'Dữ liệu gửi quá dài.' });
    data = JSON.parse(body);
  } catch {
    return json(400, { status: 'error', message: 'Dữ liệu gửi không hợp lệ.' });
  }
  if (!validSubmission(data)) return json(400, { status: 'error', message: 'Vui lòng kiểm tra lại các thông tin đăng ký.' });

  const currentStatus = await readPublishedFormStatus(fetchGoogle);
  if (currentStatus === 'closed') return json(410, { status: 'closed' });
  if (currentStatus !== 'open') return json(503, { status: 'error', message: 'Chưa kiểm tra được Google Form. Vui lòng thử lại sau.' });

  try {
    const response = await fetchGoogle(`${GALA_GOOGLE_FORM_CONFIG.actionUrl}?hl=en`, {
      method: 'POST',
      body: buildGalaFormPayload(data),
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000)
    });
    if (googlePage(response.url) === 'closed') return json(410, { status: 'closed' });
    const html = await response.text();
    if (response.ok && googlePage(response.url) === 'response' && html.includes('Your response has been recorded')) {
      return json(200, { status: 'submitted', verified: true });
    }
    return json(502, {
      status: 'unverified',
      verified: false,
      message: 'Google chưa xác nhận kết quả gửi. Vui lòng liên hệ Ban Tổ chức trước khi gửi lại để tránh trùng đơn.'
    });
  } catch {
    return json(502, {
      status: 'unverified',
      verified: false,
      message: 'Mất kết nối trong lúc gửi. Vui lòng liên hệ Ban Tổ chức trước khi gửi lại để tránh trùng đơn.'
    });
  }
};
