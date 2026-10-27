// src/utils/validation.js
/**
 * Frontend Validation Rules — Derived strictly from PHASE 0 Specification
 */

// Regex patterns
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_VN: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i,
  FACEBOOK_URL: /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9._?=&-]+/i,
  NAME: /^[a-zA-ZÀ-ỹ\s]{2,100}$/
};

/**
 * Validates a single field by name
 * Returns an error string if invalid, or null if valid.
 */
export const validateField = (fieldName, value, allValues = {}) => {
  const strVal = typeof value === 'string' ? value.trim() : '';

  switch (fieldName) {
    case 'fullName':
      if (!strVal) return 'Vui lòng nhập họ và tên của bạn.';
      if (strVal.length < 2) return 'Họ và tên phải có tối thiểu 2 ký tự.';
      if (strVal.length > 100) return 'Họ và tên không được vượt quá 100 ký tự.';
      if (!REGEX.NAME.test(strVal)) return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.';
      return null;

    case 'email':
      if (!strVal) return 'Vui lòng nhập địa chỉ email liên hệ.';
      if (!REGEX.EMAIL.test(strVal)) return 'Địa chỉ email không đúng định dạng (VD: example@domain.com).';
      return null;

    case 'phone': {
      if (!strVal) return 'Vui lòng nhập số điện thoại hoặc Zalo liên hệ.';
      const cleanPhone = strVal.replace(/[\s\-.]/g, '');
      if (!REGEX.PHONE_VN.test(cleanPhone)) {
        return 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).';
      }
      return null;
    }

    case 'studentId':
      if (!strVal) return 'Vui lòng nhập mã số sinh viên (MSSV).';
      if (strVal.length < 6 || strVal.length > 15) {
        return 'MSSV phải có độ dài từ 6 đến 15 ký tự.';
      }
      return null;

    case 'major':
      if (!strVal) return 'Vui lòng nhập ngành học và khóa đang theo học.';
      if (strVal.length < 3) return 'Thông tin ngành học quá ngắn (tối thiểu 3 ký tự).';
      return null;

    case 'facebookUrl':
      if (!strVal) return 'Vui lòng cung cấp link Facebook cá nhân để CLB tiện liên hệ.';
      if (!REGEX.URL.test(strVal) || !REGEX.FACEBOOK_URL.test(strVal)) {
        return 'Đường link Facebook không hợp lệ (phải bắt đầu bằng http:// hoặc https:// và chứa facebook.com).';
      }
      return null;

    case 'primaryDept':
      if (!strVal) return 'Vui lòng chọn Ban ứng tuyển ưu tiên số 1 (Nguyện vọng 1).';
      return null;

    case 'secondaryDept':
      if (strVal && strVal !== 'Không có nguyện vọng 2' && strVal === allValues.primaryDept) {
        return 'Nguyện vọng 2 không được trùng với Nguyện vọng 1.';
      }
      return null;

    case 'reason':
      if (!strVal) return 'Vui lòng chia sẻ lý do bạn mong muốn tham gia CLB.';
      if (strVal.length < 50) {
        return `Nội dung còn quá ngắn (${strVal.length}/50 ký tự). Vui lòng chia sẻ sâu sắc hơn.`;
      }
      if (strVal.length > 1500) {
        return 'Nội dung vượt quá giới hạn cho phép (tối đa 1500 ký tự).';
      }
      return null;

    case 'strengthsWeaknesses':
      if (!strVal) return 'Vui lòng chia sẻ điểm mạnh và điểm yếu của bạn.';
      if (strVal.length < 50) {
        return `Nội dung còn quá ngắn (${strVal.length}/50 ký tự tối thiểu).`;
      }
      if (strVal.length > 1500) {
        return 'Nội dung vượt quá giới hạn cho phép (tối đa 1500 ký tự).';
      }
      return null;

    case 'timeCommitment':
      if (!strVal) return 'Vui lòng chọn mức thời gian bạn có thể cam kết cho CLB.';
      return null;

    case 'skillsExperience':
      if (!strVal) return 'Vui lòng nêu các kỹ năng và kinh nghiệm liên quan đến Ban đã chọn.';
      if (strVal.length < 30) {
        return `Nội dung còn quá ngắn (${strVal.length}/30 ký tự tối thiểu).`;
      }
      if (strVal.length > 2000) {
        return 'Nội dung vượt quá giới hạn cho phép (tối đa 2000 ký tự).';
      }
      return null;

    case 'portfolioUrl':
      // Optional field
      if (strVal && !REGEX.URL.test(strVal)) {
        return 'Đường link Portfolio/CV không đúng định dạng URL (phải bắt đầu bằng http:// hoặc https://).';
      }
      return null;

    case 'scenarioAnswer':
      if (!strVal) return 'Vui lòng hoàn thành câu trả lời xử lý tình huống thực tế.';
      if (strVal.length < 50) {
        return `Câu trả lời tình huống còn quá ngắn (${strVal.length}/50 ký tự tối thiểu).`;
      }
      if (strVal.length > 2000) {
        return 'Nội dung vượt quá giới hạn cho phép (tối đa 2000 ký tự).';
      }
      return null;

    case 'channels':
      if (Array.isArray(value) && value.length > 3) {
        return 'Chỉ được chọn tối đa 3 kênh thông tin.';
      }
      return null;

    case 'commitment':
      if (!value) {
        return 'Bạn cần xác nhận cam kết trước khi hoàn tất nộp hồ sơ.';
      }
      return null;

    default:
      return null;
  }
};

/**
 * Validates the entire form
 */
export const validateAll = (formData) => {
  const errors = {};
  const fields = [
    'fullName',
    'email',
    'phone',
    'studentId',
    'major',
    'facebookUrl',
    'primaryDept',
    'secondaryDept',
    'reason',
    'strengthsWeaknesses',
    'timeCommitment',
    'skillsExperience',
    'portfolioUrl',
    'scenarioAnswer',
    'channels',
    'commitment'
  ];

  fields.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

/**
 * Validates fields belonging to a specific step
 */
export const validateStep = (stepIndex, formData) => {
  const stepFieldsMap = {
    1: ['fullName', 'email', 'phone', 'studentId', 'major', 'facebookUrl'],
    2: ['primaryDept', 'secondaryDept', 'reason', 'strengthsWeaknesses', 'timeCommitment'],
    3: ['skillsExperience', 'portfolioUrl', 'scenarioAnswer'],
    4: ['channels', 'commitment']
  };

  const fieldsToCheck = stepFieldsMap[stepIndex] || [];
  const errors = {};

  fieldsToCheck.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
