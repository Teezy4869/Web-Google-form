// src/utils/validation.js
import { ATTENDEE_TYPE_OPTIONS } from '../data/registrationConfig.js';

/**
 * Regular expressions for Vietnamese phone numbers and names
 */
export const REGEX = {
  // RFC 5322 compliant simplified email format
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Standard Vietnamese phone numbers (10 digits starting with 03, 05, 07, 08, 09, or +84 equivalent)
  PHONE_VN: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,

  // Vietnamese Unicode letters, spaces, and common name punctuation (. - ')
  NAME_VN: /^[\p{L}\s.'-]+$/u
};

/**
 * Normalizes phone number strings by stripping formatting characters (spaces, dots, hyphens, parens)
 */
export const normalizePhone = (phoneStr) => {
  if (!phoneStr || typeof phoneStr !== 'string') return '';
  return phoneStr.replace(/[\s\-().]/g, '');
};

/**
 * List of valid attendee types derived from central configuration
 */
export const VALID_ATTENDEE_TYPES = ATTENDEE_TYPE_OPTIONS.map((opt) => opt.value);

/**
 * Validates an individual form field by name.
 * Returns null if valid, or an error message string if invalid.
 */
export const validateField = (fieldName, value) => {
  const strVal = typeof value === 'string' ? value.trim() : '';

  switch (fieldName) {
    case 'fullName':
      if (!strVal) {
        return 'Vui lòng nhập họ và tên của bạn.';
      }
      if (strVal.length < 2) {
        return 'Họ và tên phải có tối thiểu 2 ký tự.';
      }
      if (strVal.length > 100) {
        return 'Họ và tên không được vượt quá 100 ký tự.';
      }
      if (!REGEX.NAME_VN.test(strVal)) {
        return 'Họ và tên chỉ được chứa chữ cái tiếng Việt và khoảng trắng.';
      }
      return null;

    case 'email':
      if (!strVal) {
        return 'Vui lòng nhập địa chỉ email liên hệ.';
      }
      if (strVal.length > 150) {
        return 'Địa chỉ email quá dài (tối đa 150 ký tự).';
      }
      if (!REGEX.EMAIL.test(strVal)) {
        return 'Địa chỉ email không đúng định dạng (Ví dụ: example@domain.com).';
      }
      return null;

    case 'phone': {
      if (!strVal) {
        return 'Vui lòng nhập số điện thoại liên hệ.';
      }
      const cleanPhone = normalizePhone(strVal);
      if (!REGEX.PHONE_VN.test(cleanPhone)) {
        return 'Số điện thoại không hợp lệ (cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09 hoặc +84).';
      }
      return null;
    }

    case 'attendeeType':
      if (!strVal) {
        return 'Vui lòng chọn nhóm người tham dự.';
      }
      if (!VALID_ATTENDEE_TYPES.includes(strVal)) {
        return 'Nhóm người tham dự không hợp lệ.';
      }
      return null;

    case 'consent':
      if (!value) {
        return 'Vui lòng đồng ý với điều khoản sử dụng thông tin để tiếp tục.';
      }
      return null;

    case 'studentId':
      if (!strVal) return null; // Optional
      if (strVal.length < 4 || strVal.length > 20) {
        return 'Mã sinh viên phải có độ dài từ 4 đến 20 ký tự.';
      }
      return null;

    case 'className':
      if (!strVal) return null; // Optional
      if (strVal.length > 100) {
        return 'Thông tin lớp / đơn vị không được vượt quá 100 ký tự.';
      }
      return null;

    case 'note':
      if (!strVal) return null; // Optional
      if (strVal.length > 1000) {
        return 'Ghi chú không được vượt quá 1000 ký tự.';
      }
      return null;

    default:
      return null;
  }
};

/**
 * Validates all fields on the registration form.
 * Returns an object mapping invalid field names to their respective error strings.
 */
export const validateAll = (
  formData,
  fields = ['fullName', 'email', 'phone', 'attendeeType', 'studentId', 'className', 'note', 'consent']
) => {
  const errors = {};

  fields.forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
