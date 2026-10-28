// src/services/googleForm.js
import { ATTENDEE_TYPE_OPTIONS } from '../data/registrationConfig.js';
import { normalizePhone } from '../utils/validation.js';

/**
 * ==============================================================================
 * GALA NIGHT GOOGLE FORM INTEGRATION SERVICE
 * ==============================================================================
 * Central configuration and submission handler for Gala Night Attendance Registration.
 *
 * MODES:
 * 1. UNCONFIGURED (Default):
 *    - Active when placeholder URLs or Entry IDs remain.
 *    - Never transmits fake or real data to placeholder endpoints.
 *    - Returns status 'unconfigured' with clear guidance.
 *
 * 2. MOCK:
 *    - For isolated local UI testing and development.
 *    - Simulates network latency and returns mocked results without network hits.
 *
 * 3. DIRECT_GOOGLE_FORM:
 *    - Submits data directly to Google Forms /formResponse via a hidden iframe POST.
 *    - IMPORTANT (Browser Limitation): Due to CORS security rules, direct browser POST
 *      yields an opaque response (status 0). The frontend CANNOT verify whether Google Form
 *      successfully inserted the record or rejected it (e.g., closed form, entry ID mismatch).
 *      Therefore, this mode yields status 'submitted_unverified' with `verified: false`.
 *
 * 4. VERIFIED_API:
 *    - Submits data to an authorized serverless proxy / backend API.
 *    - Returns status 'success' with `verified: true` only after confirmed HTTP 200 JSON.
 * ==============================================================================
 */

export const GALA_FORM_MODE = {
  UNCONFIGURED: 'UNCONFIGURED',
  MOCK: 'MOCK',
  DIRECT_GOOGLE_FORM: 'DIRECT_GOOGLE_FORM',
  VERIFIED_API: 'VERIFIED_API'
};

/**
 * Centralized Google Form Configuration
 * SAFE PLACEHOLDERS: Do NOT commit real credentials or private keys.
 */
export const GALA_GOOGLE_FORM_CONFIG = {
  // Google Form submission endpoint (format: https://docs.google.com/forms/d/e/{FORM_ID}/formResponse)
  actionUrl: '[UNCONFIGURED_GALA_FORM_ACTION_URL]',

  // Optional verified proxy endpoint (e.g. Serverless Cloud Function / API Route)
  verifiedApiUrl: null,

  // Current active mode (Default is strictly UNCONFIGURED until real values are provided)
  mode: GALA_FORM_MODE.UNCONFIGURED,

  // Exact Google Form Entry IDs for each field
  entries: {
    fullName: '[PLACEHOLDER_ENTRY_FULL_NAME]',
    email: '[PLACEHOLDER_ENTRY_EMAIL]',
    phone: '[PLACEHOLDER_ENTRY_PHONE]',
    studentId: '[PLACEHOLDER_ENTRY_STUDENT_ID]',
    className: '[PLACEHOLDER_ENTRY_CLASS_NAME]',
    attendeeType: '[PLACEHOLDER_ENTRY_ATTENDEE_TYPE]',
    note: '[PLACEHOLDER_ENTRY_NOTE]',
    consent: '[PLACEHOLDER_ENTRY_CONSENT]'
  },

  // Exact checkbox label in Google Form
  consentText: 'Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.'
};

/**
 * Checks whether the Google Form configuration is fully provided and active.
 * Returns false if the action URL or any essential entry ID is still a placeholder.
 */
export const isGoogleFormConfigured = (config = GALA_GOOGLE_FORM_CONFIG) => {
  if (
    !config.actionUrl ||
    config.actionUrl.startsWith('[') ||
    config.actionUrl.includes('UNCONFIGURED') ||
    config.actionUrl.includes('PLACEHOLDER')
  ) {
    return false;
  }

  const requiredEntries = ['fullName', 'email', 'phone', 'attendeeType', 'consent'];
  const hasRequiredEntries = requiredEntries.every((key) => {
    const entryId = config.entries[key];
    return entryId && !entryId.startsWith('[') && !entryId.includes('PLACEHOLDER');
  });

  return hasRequiredEntries;
};

/**
 * Valid attendee type values derived from configuration
 */
export const VALID_ATTENDEE_OPTIONS = ATTENDEE_TYPE_OPTIONS.map((opt) => opt.value);

/**
 * Builds and serializes the URLSearchParams payload matching Google Forms field entry IDs.
 *
 * @param {Object} formData
 * @param {Object} [config]
 * @returns {URLSearchParams}
 */
export const buildGalaFormPayload = (formData, config = GALA_GOOGLE_FORM_CONFIG) => {
  const payload = new URLSearchParams();
  const { entries, consentText } = config;

  // 1. Họ và tên (Short answer text)
  if (entries.fullName && formData.fullName) {
    payload.append(entries.fullName, String(formData.fullName).trim());
  }

  // 2. Email (Short answer text)
  if (entries.email && formData.email) {
    payload.append(entries.email, String(formData.email).trim());
  }

  // 3. Số điện thoại (Short answer text with normalized digits)
  if (entries.phone && formData.phone) {
    const cleanPhone = normalizePhone(formData.phone);
    payload.append(entries.phone, cleanPhone);
  }

  // 4. Mã sinh viên (Optional short answer text)
  if (entries.studentId && formData.studentId) {
    const val = String(formData.studentId).trim();
    if (val) payload.append(entries.studentId, val);
  }

  // 5. Lớp / Đơn vị (Optional short answer text)
  if (entries.className && formData.className) {
    const val = String(formData.className).trim();
    if (val) payload.append(entries.className, val);
  }

  // 6. Nhóm người tham dự (Multiple choice / Radio)
  if (entries.attendeeType && formData.attendeeType) {
    const attendeeVal = String(formData.attendeeType).trim();
    if (VALID_ATTENDEE_OPTIONS.includes(attendeeVal)) {
      payload.append(entries.attendeeType, attendeeVal);
    }
  }

  // 7. Ghi chú cho BTC (Optional paragraph textarea)
  if (entries.note && formData.note) {
    const noteVal = String(formData.note).trim();
    if (noteVal) payload.append(entries.note, noteVal);
  }

  // 8. Cam kết đồng ý sử dụng thông tin (Checkboxes)
  if (entries.consent && formData.consent) {
    payload.append(entries.consent, consentText || 'Tôi đồng ý');
  }

  return payload;
};

/**
 * Submits form data via a hidden iframe POST.
 * Used for direct Google Forms submission to bypass browser CORS block.
 *
 * NOTE: Resolving this promise only means the browser dispatched the POST request;
 * it DOES NOT confirm that Google Form saved the response.
 */
export const submitViaHiddenIframe = (payload, actionUrl) => {
  return new Promise((resolve) => {
    const iframeId = 'gala_gform_submission_sink';
    let iframe = document.getElementById(iframeId);

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.name = iframeId;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.action = actionUrl;
    form.method = 'POST';
    form.target = iframeId;
    form.style.display = 'none';

    for (const [key, value] of payload.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);

    const timer = setTimeout(() => {
      cleanup();
      resolve({ dispatched: true });
    }, 1600);

    const onLoadHandler = () => {
      cleanup();
      resolve({ dispatched: true });
    };

    const cleanup = () => {
      clearTimeout(timer);
      if (form.parentNode) form.parentNode.removeChild(form);
      iframe.removeEventListener('load', onLoadHandler);
    };

    iframe.addEventListener('load', onLoadHandler);
    form.submit();
  });
};

/**
 * Gala Night Registration Submission Service
 *
 * Explicitly separates 4 submission outcomes:
 * - 'unconfigured': Integration missing URL or entry IDs.
 * - 'submitted_unverified': Dispatched to Google Form directly, but unverified due to browser CORS opaque response.
 * - 'success': Confirmed saved by verified backend API (or verified mock).
 * - 'error': Network failure, timeout, or submission rejection.
 *
 * @param {Object} formData
 * @param {Object} [options]
 * @param {string} [options.mode] - Override mode ('UNCONFIGURED' | 'MOCK' | 'DIRECT_GOOGLE_FORM' | 'VERIFIED_API')
 * @param {boolean} [options.forceError] - Simulate failure
 * @param {boolean} [options.simulateUnverified] - In MOCK mode, simulate unverified behavior
 * @param {Object} [options.config] - Custom configuration override
 * @returns {Promise<{
 *   status: 'unconfigured' | 'submitted_unverified' | 'success' | 'error',
 *   success: boolean,
 *   verified: boolean,
 *   message: string,
 *   data?: Object,
 *   error?: string
 * }>}
 */
export const submitGalaRegistration = async (formData, options = {}) => {
  const config = options.config || GALA_GOOGLE_FORM_CONFIG;
  const activeMode = options.mode || config.mode;

  // 1. Error simulation (for testing)
  if (options.forceError) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Máy chủ tiếp nhận đang bảo trì hoặc mất kết nối mạng. Vui lòng thử lại.'));
      }, 500);
    });
  }

  // 2. UNCONFIGURED Mode (Default safeguard)
  const isConfigured = isGoogleFormConfigured(config);
  if (activeMode === GALA_FORM_MODE.UNCONFIGURED || (!isConfigured && activeMode !== GALA_FORM_MODE.MOCK)) {
    return {
      status: 'unconfigured',
      success: false,
      verified: false,
      message:
        'Hệ thống tiếp nhận Google Form cho Gala Night hiện đang ở chế độ chờ cấu hình (UNCONFIGURED). Dữ liệu đăng ký chưa được gửi đi. Vui lòng cập nhật Action URL và Entry IDs theo tài liệu docs/google-forms-setup.md.',
      data: { ...formData }
    };
  }

  // 3. MOCK Mode (Local UI development and preview)
  if (activeMode === GALA_FORM_MODE.MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isVerified = !options.simulateUnverified;
        resolve({
          status: isVerified ? 'success' : 'submitted_unverified',
          success: true,
          verified: isVerified,
          message: isVerified
            ? 'Đăng ký tham dự Gala Night thành công! Thông tin đã được lưu trữ (Chế độ Mock Development).'
            : 'Đã gửi thông tin đăng ký (Chế độ Mock Unverified). Vé mời sẽ được gửi qua email sau khi Ban Tổ Chức duyệt.',
          data: {
            ...formData,
            timestamp: new Date().toLocaleString('vi-VN')
          }
        });
      }, 700);
    });
  }

  // 4. VERIFIED_API Mode (Serverless / Cloud Function / Backend Proxy)
  if (activeMode === GALA_FORM_MODE.VERIFIED_API && config.verifiedApiUrl) {
    try {
      const response = await fetch(config.verifiedApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi ${response.status}: ${response.statusText}`);
      }

      const resData = await response.json();
      return {
        status: 'success',
        success: true,
        verified: true,
        message: resData.message || 'Đăng ký tham dự Gala Night đã được xác thực và lưu trữ thành công!',
        data: {
          ...formData,
          ...resData.data,
          timestamp: new Date().toLocaleString('vi-VN')
        }
      };
    } catch (err) {
      return {
        status: 'error',
        success: false,
        verified: false,
        error: err.message || 'Không thể kết nối đến máy chủ xác thực đăng ký.'
      };
    }
  }

  // 5. DIRECT_GOOGLE_FORM Mode (Hidden iframe browser POST)
  try {
    const payload = buildGalaFormPayload(formData, config);
    await submitViaHiddenIframe(payload, config.actionUrl);

    // CRITICAL: Do NOT return verified: true because browser cross-origin POST is opaque
    return {
      status: 'submitted_unverified',
      success: true,
      verified: false,
      message:
        'Biểu mẫu đăng ký đã được gửi tới Google Form. Do giới hạn bảo mật trình duyệt (CORS / Opaque Response), trạng thái lưu trữ là chưa kiểm chứng trực tiếp. Ban Tổ Chức sẽ kiểm duyệt danh sách và gửi thư mời qua email.',
      data: {
        ...formData,
        timestamp: new Date().toLocaleString('vi-VN')
      }
    };
  } catch (err) {
    return {
      status: 'error',
      success: false,
      verified: false,
      error: 'Không thể gửi biểu mẫu đến Google Forms. Vui lòng kiểm tra lại kết nối mạng của bạn.'
    };
  }
};
