// src/services/googleForm.js
/**
 * Google Form Submission Service (Phase 3 Integration)
 * Architecture: React SPA -> Google Form endpoint (/formResponse) -> Google Sheets
 */

// Single source of truth for Google Form action endpoint
export const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScy07VkRFm20Ca9s-V_z-R52HCRl_JHeuOgNz1PmL1cyFtlKQ/formResponse';

// Single source of truth for Google Form field mapping (Extracted from real form)
export const GOOGLE_FORM_FIELDS = {
  fullName: 'entry.523446277',
  email: 'entry.359239353',
  phone: 'entry.166641079',
  studentId: 'entry.1565377355',
  major: 'entry.83598713',
  facebookUrl: 'entry.1942788063',
  primaryDept: 'entry.1089279896',
  secondaryDept: 'entry.609241999',
  reason: 'entry.455460941',
  strengthsWeaknesses: 'entry.840897085',
  timeCommitment: 'entry.1100627712',
  channels: 'entry.528815650',
  skillsExperience: 'entry.1872656689',
  portfolioUrl: 'entry.2124040579',
  scenarioAnswer: 'entry.31730883',
  commitment: 'entry.506148436'
};

export const COMMITMENT_VALUE =
  'Tôi xác nhận thông tin trên là chính xác và cam kết tuân thủ các quy định của CLB.';

/**
 * Normalizes and converts React form data into Google Form URLSearchParams payload
 */
export const buildGoogleFormPayload = (formData) => {
  const payload = new URLSearchParams();

  // Mandatory Google Form Multi-Page parameters
  // Without these, Google Form treats the multi-section submission as incomplete on Page 0,
  // incrementing the response count but omitting all question answers from Google Sheets.
  payload.append('fvv', '1');
  payload.append('pageHistory', '0,1,2,3');

  // Text, Email, Phone, MSSV, Major, URL
  payload.append(GOOGLE_FORM_FIELDS.fullName, (formData.fullName || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.email, (formData.email || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.phone, (formData.phone || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.studentId, (formData.studentId || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.major, (formData.major || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.facebookUrl, (formData.facebookUrl || '').trim());

  // Single-choice departments & general
  payload.append(GOOGLE_FORM_FIELDS.primaryDept, formData.primaryDept || '');
  payload.append(GOOGLE_FORM_FIELDS.secondaryDept, formData.secondaryDept || 'Không có nguyện vọng 2');
  payload.append(GOOGLE_FORM_FIELDS.reason, (formData.reason || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.strengthsWeaknesses, (formData.strengthsWeaknesses || '').trim());
  payload.append(GOOGLE_FORM_FIELDS.timeCommitment, formData.timeCommitment || '');

  // Paragraph questions
  payload.append(GOOGLE_FORM_FIELDS.skillsExperience, (formData.skillsExperience || '').trim());
  if (formData.portfolioUrl && formData.portfolioUrl.trim()) {
    payload.append(GOOGLE_FORM_FIELDS.portfolioUrl, formData.portfolioUrl.trim());
  }
  payload.append(GOOGLE_FORM_FIELDS.scenarioAnswer, (formData.scenarioAnswer || '').trim());

  // Multi-value checkbox: Discovery Channels
  // Google Form expects multiple entries with the exact same key for checkboxes
  if (Array.isArray(formData.channels) && formData.channels.length > 0) {
    formData.channels.forEach((channel) => {
      payload.append(GOOGLE_FORM_FIELDS.channels, channel);
    });
  }

  // Single checkbox: Commitment
  if (formData.commitment) {
    payload.append(GOOGLE_FORM_FIELDS.commitment, COMMITMENT_VALUE);
  }

  return payload;
};

/**
 * Submits the form data to Google Form via hidden iframe Form POST or fetch
 */
export const submitRecruitmentForm = async (formData) => {
  // Client-side payload sanity check
  if (!formData.fullName || !formData.email || !formData.phone || !formData.primaryDept) {
    throw new Error('Dữ liệu biểu mẫu không đầy đủ các trường bắt buộc.');
  }

  const payload = buildGoogleFormPayload(formData);

  try {
    // Primary approach: Fetch with mode: 'no-cors'
    // This issues an application/x-www-form-urlencoded POST request to Google Form
    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    });

    return {
      success: true,
      timestamp: new Date().toLocaleString('vi-VN'),
      applicantName: formData.fullName,
      email: formData.email,
      primaryDept: formData.primaryDept
    };
  } catch {
    // Fallback approach: Hidden Iframe Form POST
    try {
      await submitViaHiddenIframe(payload);
      return {
        success: true,
        timestamp: new Date().toLocaleString('vi-VN'),
        applicantName: formData.fullName,
        email: formData.email,
        primaryDept: formData.primaryDept
      };
    } catch {
      throw new Error(
        'Không thể kết nối đến máy chủ Google Form tiếp nhận. Vui lòng kiểm tra lại kết nối mạng và thử lại!'
      );
    }
  }
};

/**
 * Hidden Iframe Form POST submission fallback
 */
const submitViaHiddenIframe = (payload) => {
  return new Promise((resolve) => {
    const iframeId = 'gform_submission_sink';
    let iframe = document.getElementById(iframeId);

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.name = iframeId;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.action = GOOGLE_FORM_ACTION_URL;
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

    // Give iframe a moment to receive response
    let timer = setTimeout(() => {
      cleanup();
      resolve(true);
    }, 1500);

    const onLoadHandler = () => {
      cleanup();
      resolve(true);
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
