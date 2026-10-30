// Published respondent form: https://docs.google.com/forms/d/e/1FAIpQLSetvIhKaT7wDqppc-GdmKsmVX_npZQdbAEICTI575AI6XluWA/viewform
// Entry IDs and page history were read from that form on 29/10/2026.
export const GALA_GOOGLE_FORM_CONFIG = {
  viewUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSetvIhKaT7wDqppc-GdmKsmVX_npZQdbAEICTI575AI6XluWA/viewform',
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSetvIhKaT7wDqppc-GdmKsmVX_npZQdbAEICTI575AI6XluWA/formResponse',
  entries: {
    fullName: 'entry.1885339017',
    school: 'entry.2033628016',
    studentId: 'entry.1368885948',
    className: 'entry.325967802',
    phone: 'entry.1786229529',
    email: 'entry.240186417',
    facebook: 'entry.478477233',
    note: 'entry.1520100712'
  }
};

export const isGoogleFormConfigured = (config = GALA_GOOGLE_FORM_CONFIG) =>
  config.actionUrl?.startsWith('https://docs.google.com/forms/d/e/') &&
  Object.values(config.entries).every((entry) => /^entry\.\d+$/.test(entry));

export const buildGalaFormPayload = (formData, config = GALA_GOOGLE_FORM_CONFIG) => {
  const payload = new URLSearchParams();
  const { entries } = config;

  for (const field of ['fullName', 'studentId', 'className', 'phone', 'email', 'facebook']) {
    payload.set(entries[field], String(formData[field] ?? '').trim());
  }

  if (formData.school === '__other_option__') {
    payload.set(entries.school, '__other_option__');
    payload.set(`${entries.school}.other_option_response`, String(formData.schoolOther ?? '').trim());
  } else {
    payload.set(entries.school, String(formData.school ?? '').trim());
  }

  if (String(formData.note ?? '').trim()) {
    payload.set(entries.note, String(formData.note).trim());
  }

  // The source form contains an introduction, the personal-information page,
  // and a final optional-question page. Google sends these values with its form POST.
  payload.set('fvv', '1');
  payload.set('pageHistory', '0,1,2');
  payload.set('submissionTimestamp', '-1');
  return payload;
};

const readGatewayResponse = async (response) => {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Máy chủ đăng ký chưa được cấu hình.');
  }
  return response.json();
};

export const getGalaRegistrationStatus = async () => {
  try {
    const response = await fetch('/api/registration', { cache: 'no-store' });
    const result = await readGatewayResponse(response);
    return result.status === 'open' || result.status === 'closed' ? result.status : 'status_error';
  } catch {
    return 'status_error';
  }
};

export const submitGalaRegistration = async (formData) => {
  if (!isGoogleFormConfigured()) {
    return { status: 'unconfigured', verified: false, message: 'Biểu mẫu chưa được cấu hình.' };
  }

  try {
    const response = await fetch('/api/registration', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await readGatewayResponse(response);
  } catch {
    return {
      status: 'unverified',
      verified: false,
      message: 'Không xác nhận được kết quả gửi. Vui lòng liên hệ Ban Tổ chức trước khi gửi lại để tránh trùng đơn.'
    };
  }
};
