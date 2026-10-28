// src/data/registrationConfig.js
/**
 * Central Configuration for Gala Night Event Registration Form
 * All field labels, placeholders, helper texts, validation constraints, and choices are centralized here.
 */

export const ATTENDEE_TYPE_OPTIONS = [
  { value: "Thành viên CLB", label: "Thành viên CLB" },
  { value: "Cựu thành viên", label: "Cựu thành viên" },
  { value: "Khách mời", label: "Khách mời" },
  { value: "Khác", label: "Khác" }
];

export const REGISTRATION_FIELDS = {
  fullName: {
    id: "fullName",
    name: "fullName",
    label: "Họ và tên",
    required: true,
    placeholder: "Ví dụ: Nguyễn Văn An",
    helperText: "Vui lòng nhập họ và tên đầy đủ theo giấy tờ định danh.",
    autoComplete: "name",
    type: "text",
    maxLength: 100
  },
  email: {
    id: "email",
    name: "email",
    label: "Địa chỉ Email",
    required: true,
    placeholder: "example@gmail.com",
    helperText: "Email chính thức nhận thư mời và thông tin check-in sự kiện.",
    autoComplete: "email",
    type: "email",
    maxLength: 150
  },
  phone: {
    id: "phone",
    name: "phone",
    label: "Số điện thoại liên hệ",
    required: true,
    placeholder: "0987654321",
    helperText: "Số điện thoại có Zalo để Ban Tổ Chức tiện liên lạc.",
    autoComplete: "tel",
    type: "tel",
    maxLength: 15
  },
  studentId: {
    id: "studentId",
    name: "studentId",
    label: "Mã sinh viên",
    required: false,
    placeholder: "Ví dụ: B23DCCN001",
    helperText: "Dành cho sinh viên (tùy chọn).",
    autoComplete: "off",
    type: "text",
    maxLength: 20
  },
  className: {
    id: "className",
    name: "className",
    label: "Lớp / Đơn vị",
    required: false,
    placeholder: "Ví dụ: D23CQCN01-B hoặc Tên tổ chức/CLB",
    helperText: "Lớp niên khóa hoặc đơn vị của bạn (tùy chọn).",
    autoComplete: "organization",
    type: "text",
    maxLength: 100
  },
  attendeeType: {
    name: "attendeeType",
    label: "Nhóm người tham dự",
    required: true,
    helperText: "Vui lòng chọn nhóm đối tượng tham dự phù hợp nhất.",
    options: ATTENDEE_TYPE_OPTIONS
  },
  note: {
    id: "note",
    name: "note",
    label: "Ghi chú cho Ban tổ chức",
    required: false,
    placeholder: "Lời nhắn gửi, yêu cầu chỗ ngồi hoặc câu hỏi dành cho Ban Tổ Chức...",
    helperText: "Tối đa 1000 ký tự (tùy chọn).",
    maxLength: 1000,
    rows: 4
  },
  consent: {
    id: "consent",
    name: "consent",
    label: "Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.",
    required: true
  }
};

