import { SCHOOL_OPTIONS } from '../data/registrationConfig.js';

const REQUIRED_FIELDS = [
  'fullName', 'school', 'studentId', 'className', 'phone', 'email'
];

export const normalizePhone = (phone) =>
  typeof phone === 'string' ? phone.replace(/[\s\-().]/g, '') : '';

export const validateField = (fieldName, value, formData = {}) => {
  const text = typeof value === 'string' ? value.trim() : '';

  if (fieldName === 'school') {
    if (!text) return 'Vui lòng chọn trường bạn đang theo học.';
    if (!SCHOOL_OPTIONS.some((option) => option.value === text)) {
      return 'Lựa chọn trường không hợp lệ.';
    }
  }

  if (fieldName === 'schoolOther') {
    if (formData.school === '__other_option__' && !text) {
      return 'Vui lòng nhập tên trường của bạn.';
    }
    return null;
  }

  if (REQUIRED_FIELDS.includes(fieldName) && !text) {
    return 'Vui lòng điền thông tin này.';
  }

  if (fieldName === 'email' && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return 'Vui lòng nhập địa chỉ email hợp lệ.';
  }

  return null;
};

export const validateAll = (formData) => {
  const errors = {};
  for (const field of [...REQUIRED_FIELDS, 'schoolOther']) {
    const error = validateField(field, formData[field], formData);
    if (error) errors[field] = error;
  }
  return errors;
};
