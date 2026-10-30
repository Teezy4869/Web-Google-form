// Questions and order verified against the published Solfera Google Form.
export const SCHOOL_OPTIONS = [
  { value: 'Đại học Kinh tế Quốc dân', label: 'Đại học Kinh tế Quốc dân' },
  { value: '__other_option__', label: 'Mục khác' }
];

export const REGISTRATION_FIELDS = {
  fullName: {
    name: 'fullName', label: 'Họ và tên', required: true,
    type: 'text', autoComplete: 'name', placeholder: 'Họ và tên của bạn'
  },
  school: {
    name: 'school', label: 'Trường bạn đang theo học', required: true,
    options: SCHOOL_OPTIONS
  },
  schoolOther: {
    name: 'schoolOther', label: 'Tên trường khác', required: true,
    type: 'text', placeholder: 'Nhập tên trường của bạn'
  },
  studentId: {
    name: 'studentId', label: 'Mã sinh viên', required: true,
    type: 'text', placeholder: 'Nếu không có, ghi N/A',
    helperText: 'Nếu không có, vui lòng ghi N/A.'
  },
  className: {
    name: 'className', label: 'Lớp chuyên ngành', required: true,
    type: 'text', placeholder: 'Nếu không có, ghi N/A',
    helperText: 'Nếu không có, vui lòng ghi N/A.'
  },
  phone: {
    name: 'phone', label: 'Số điện thoại', required: true,
    type: 'tel', autoComplete: 'tel', placeholder: 'Số điện thoại liên hệ'
  },
  email: {
    name: 'email', label: 'Email', required: true,
    type: 'email', autoComplete: 'email', placeholder: 'ten@example.com'
  },
  note: {
    name: 'note', label: 'Nếu có bất kỳ thắc mắc nào, hãy gửi đến Ban Tổ chức tại đây.',
    required: false, placeholder: 'Câu hỏi dành cho Ban Tổ chức (không bắt buộc)'
  }
};
