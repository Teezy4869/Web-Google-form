// src/components/registration/RegistrationForm.jsx
import React, { useState, useRef } from 'react';
import { User, Users, FileText, CheckCircle2, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { REGISTRATION_FIELDS } from '../../data/registrationConfig';
import { TextInput } from '../form/TextInput';
import { TextArea } from '../form/TextArea';
import { RadioGroup } from '../form/RadioGroup';
import { SingleCheckbox } from '../form/SingleCheckbox';
import { FormSection } from '../form/FormSection';
import { SubmitButton } from '../form/SubmitButton';
import { StatusMessage } from '../common/StatusMessage';
import { validateField, validateAll } from '../../utils/validation';
import { submitGalaRegistration } from '../../services/googleForm';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  studentId: '',
  className: '',
  attendeeType: '',
  note: '',
  consent: false
};

const FORM_NAV_STEPS = [
  { id: 'step-1', targetId: 'group-fullName', label: '1. Cá Nhân', icon: User },
  { id: 'step-2', targetId: 'group-attendeeType', label: '2. Đối Tượng', icon: Users },
  { id: 'step-3', targetId: 'group-note', label: '3. Ghi Chú', icon: FileText },
  { id: 'step-4', targetId: 'group-consent', label: '4. Xác Nhận', icon: CheckCircle2 }
];

/**
 * Single-Page Event Attendance Registration Form — Solfera D-DAY 2026
 *
 * Supported 6 Explicit Submission States:
 * - 'idle': Ready for user input.
 * - 'validating': Validating all fields upon form submission.
 * - 'submitting': In-flight network request with locked UI (prevents double submits).
 * - 'submitted_unverified': Form submitted via opaque/no-cors channel (awaits email verification).
 * - 'success': Submission fully confirmed and verified.
 * - 'error': Network or server failure. User-entered inputs are STRICTLY PRESERVED.
 * - 'unconfigured': Google Form integration pending configuration safe mode.
 *
 * Pluggable Service:
 * - Accepts `onSubmitService` prop (defaults to `submitGalaRegistration`).
 */
export const RegistrationForm = ({
  onSuccess,
  onSubmitService = submitGalaRegistration
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusInfo, setStatusInfo] = useState({ title: '', message: '' });
  const statusRef = useRef(null);

  // Controlled change handler with inline real-time error clearance
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Real-time error validation if field was previously marked with error
      if (errors[name]) {
        const error = validateField(name, value);
        setErrors((prevErr) => ({ ...prevErr, [name]: error }));
      }
      return updated;
    });
  };

  // Blur validation per field
  const handleBlur = (e) => {
    const { name } = e.target;
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Explicit form reset (allows registering additional attendees)
  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setStatus('idle');
    setStatusInfo({ title: '', message: '' });
  };

  // Smooth scroll helper for step indicators
  const handleStepClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = targetElement.querySelector('input, textarea');
      if (input) {
        input.focus();
      }
    }
  };

  // Form submission handler with double-click guard and state management
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent concurrent / double submissions
    if (status === 'submitting' || status === 'validating') {
      return;
    }

    // Step 1: Transition to 'validating' state
    setStatus('validating');
    setStatusInfo({ title: '', message: '' });

    const formErrors = validateAll(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus('idle');

      // Scroll smoothly to and focus the first invalid field
      const firstField = Object.keys(formErrors)[0];
      const element = document.getElementById(`group-${firstField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = element.querySelector('input, textarea');
        if (input) {
          input.focus();
        }
      }
      return;
    }

    // Step 2: Transition to 'submitting' state
    setStatus('submitting');

    try {
      const response = await onSubmitService(formData);

      if (response && response.status === 'unconfigured') {
        setStatus('unconfigured');
        setStatusInfo({
          title: 'Biểu Mẫu Tiếp Nhận Đang Chờ Cấu Hình',
          message: response.message
        });

        if (statusRef.current) {
          statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      if (response && response.success) {
        const isVerified = response.verified !== false;

        if (isVerified) {
          // Explicit verified success
          setStatus('success');
          setStatusInfo({
            title: 'Đăng Ký Thành Công!',
            message: response.message || 'Thông tin của bạn đã được ghi nhận vào danh sách tham dự Solfera D-DAY 2026.'
          });

          if (onSuccess) {
            onSuccess(response.data || formData, { verified: true });
          }
        } else {
          // Explicit unverified submission (e.g., opaque response from Google Form / no-cors)
          setStatus('submitted_unverified');
          setStatusInfo({
            title: 'Thông Tin Đã Được Tiếp Nhận (Chờ Duyệt)',
            message: response.message || 'Biểu mẫu đã được gửi tới hệ thống. Do cơ chế kiểm duyệt bảo mật, vé mời điện tử chính thức sẽ được gửi tới email của bạn sau khi Ban Tổ Chức đối soát.'
          });

          if (onSuccess) {
            onSuccess(response.data || formData, { verified: false });
          }
        }

        // Scroll to status banner
        if (statusRef.current) {
          statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        throw new Error(response?.error || 'Không thể hoàn tất đăng ký. Vui lòng kiểm tra lại kết nối.');
      }
    } catch (err) {
      // Step 3: Transition to 'error' state
      // IMPORTANT: formData is STRICTLY PRESERVED so the user never loses their typed answers
      setStatus('error');
      setStatusInfo({
        title: 'Chưa Thể Hoàn Tất Đăng Ký',
        message: err.message || 'Đã có sự cố kết nối trong quá trình gửi thông tin. Dữ liệu của bạn vẫn được lưu nguyên vẹn, vui lòng bấm thử lại.'
      });

      // Scroll to error message
      if (statusRef.current) {
        statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isFormLocked = status === 'submitting' || status === 'validating';

  return (
    <div className="glass-card form-card">
      {/* Decorative luxury accent line on top of form */}
      <div className="form-card-top-accent" aria-hidden="true" />

      {/* Visual Step Navigation Pill Strip */}
      <nav className="form-step-nav" aria-label="Các phần của biểu mẫu">
        <span className="form-step-nav-label">Các phần nội dung:</span>
        <div className="form-step-pills">
          {FORM_NAV_STEPS.map((step) => {
            const StepIcon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.targetId)}
                className="form-step-pill-btn"
                title={`Cuộn nhanh tới phần ${step.label}`}
              >
                <StepIcon size={14} className="text-gold" aria-hidden="true" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Dynamic Status / Feedback Banner */}
      <div ref={statusRef}>
        <StatusMessage
          status={status}
          title={statusInfo.title}
          message={statusInfo.message}
          onDismiss={() => {
            if (status === 'error' || status === 'unconfigured') {
              setStatus('idle');
            }
          }}
          actionButton={
            (status === 'success' || status === 'submitted_unverified') ? (
              <button
                type="button"
                onClick={handleResetForm}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.86rem' }}
              >
                <RotateCcw size={15} />
                <span>Đăng Ký Cho Người Khác / Làm Mới</span>
              </button>
            ) : null
          }
        />
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Biểu mẫu đăng ký tham dự Solfera D-DAY 2026"
      >
        {/* Section 1: Thông tin cá nhân */}
        <FormSection
          icon={User}
          title="1. Thông Tin Cá Nhân"
          description="Vui lòng cung cấp thông tin liên hệ chính xác để Ban Tổ Chức xuất vé mời điện tử và đối soát check-in."
        >
          <TextInput
            id={REGISTRATION_FIELDS.fullName.id}
            name={REGISTRATION_FIELDS.fullName.name}
            label={REGISTRATION_FIELDS.fullName.label}
            required={REGISTRATION_FIELDS.fullName.required}
            placeholder={REGISTRATION_FIELDS.fullName.placeholder}
            helperText={REGISTRATION_FIELDS.fullName.helperText}
            autoComplete={REGISTRATION_FIELDS.fullName.autoComplete}
            type={REGISTRATION_FIELDS.fullName.type}
            maxLength={REGISTRATION_FIELDS.fullName.maxLength}
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
          />

          <div className="grid-2">
            <TextInput
              id={REGISTRATION_FIELDS.email.id}
              name={REGISTRATION_FIELDS.email.name}
              label={REGISTRATION_FIELDS.email.label}
              required={REGISTRATION_FIELDS.email.required}
              placeholder={REGISTRATION_FIELDS.email.placeholder}
              helperText={REGISTRATION_FIELDS.email.helperText}
              autoComplete={REGISTRATION_FIELDS.email.autoComplete}
              type={REGISTRATION_FIELDS.email.type}
              maxLength={REGISTRATION_FIELDS.email.maxLength}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />

            <TextInput
              id={REGISTRATION_FIELDS.phone.id}
              name={REGISTRATION_FIELDS.phone.name}
              label={REGISTRATION_FIELDS.phone.label}
              required={REGISTRATION_FIELDS.phone.required}
              placeholder={REGISTRATION_FIELDS.phone.placeholder}
              helperText={REGISTRATION_FIELDS.phone.helperText}
              autoComplete={REGISTRATION_FIELDS.phone.autoComplete}
              type={REGISTRATION_FIELDS.phone.type}
              maxLength={REGISTRATION_FIELDS.phone.maxLength}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
            />
          </div>

          <div className="grid-2">
            <TextInput
              id={REGISTRATION_FIELDS.studentId.id}
              name={REGISTRATION_FIELDS.studentId.name}
              label={REGISTRATION_FIELDS.studentId.label}
              required={REGISTRATION_FIELDS.studentId.required}
              placeholder={REGISTRATION_FIELDS.studentId.placeholder}
              helperText={REGISTRATION_FIELDS.studentId.helperText}
              autoComplete={REGISTRATION_FIELDS.studentId.autoComplete}
              type={REGISTRATION_FIELDS.studentId.type}
              maxLength={REGISTRATION_FIELDS.studentId.maxLength}
              value={formData.studentId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.studentId}
            />

            <TextInput
              id={REGISTRATION_FIELDS.className.id}
              name={REGISTRATION_FIELDS.className.name}
              label={REGISTRATION_FIELDS.className.label}
              required={REGISTRATION_FIELDS.className.required}
              placeholder={REGISTRATION_FIELDS.className.placeholder}
              helperText={REGISTRATION_FIELDS.className.helperText}
              autoComplete={REGISTRATION_FIELDS.className.autoComplete}
              type={REGISTRATION_FIELDS.className.type}
              maxLength={REGISTRATION_FIELDS.className.maxLength}
              value={formData.className}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.className}
            />
          </div>
        </FormSection>

        {/* Section 2: Nhóm người tham dự */}
        <FormSection
          icon={Users}
          title="2. Đối Tượng Tham Dự"
          description="Lựa chọn nhóm đối tượng phù hợp để Ban Tổ Chức bố trí khu vực đón tiếp và check-in thuận tiện nhất."
        >
          <RadioGroup
            name={REGISTRATION_FIELDS.attendeeType.name}
            label={REGISTRATION_FIELDS.attendeeType.label}
            required={REGISTRATION_FIELDS.attendeeType.required}
            helperText={REGISTRATION_FIELDS.attendeeType.helperText}
            options={REGISTRATION_FIELDS.attendeeType.options}
            value={formData.attendeeType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.attendeeType}
          />
        </FormSection>

        {/* Section 3: Ghi chú & Đóng góp ý kiến */}
        <FormSection
          icon={FileText}
          title="3. Ghi Chú & Ý Kiến Đóng Góp"
          description="Bạn có bất kỳ lời chúc mừng, yêu cầu chỗ ngồi hoặc câu hỏi nào gửi tới Ban Tổ Chức không?"
        >
          <TextArea
            id={REGISTRATION_FIELDS.note.id}
            name={REGISTRATION_FIELDS.note.name}
            label={REGISTRATION_FIELDS.note.label}
            required={REGISTRATION_FIELDS.note.required}
            placeholder={REGISTRATION_FIELDS.note.placeholder}
            helperText={REGISTRATION_FIELDS.note.helperText}
            maxLength={REGISTRATION_FIELDS.note.maxLength}
            rows={REGISTRATION_FIELDS.note.rows}
            value={formData.note}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.note}
          />
        </FormSection>

        {/* Section 4: Đồng ý sử dụng thông tin & Xác nhận nộp đơn */}
        <FormSection
          icon={CheckCircle2}
          title="4. Xác Nhận Đăng Ký"
          description="Vui lòng đọc kỹ cam kết trước khi hoàn tất đăng ký giữ chỗ tham dự."
        >
          <SingleCheckbox
            id={REGISTRATION_FIELDS.consent.id}
            name={REGISTRATION_FIELDS.consent.name}
            label={REGISTRATION_FIELDS.consent.label}
            required={REGISTRATION_FIELDS.consent.required}
            checked={formData.consent}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.consent}
          />

          <div className="form-submit-row">
            <div className="form-security-badge">
              <ShieldCheck size={16} className="text-gold" aria-hidden="true" />
              <span>Dữ liệu đăng ký được mã hóa và bảo mật bởi Ban Tổ Chức YGC / AEP 2026.</span>
            </div>

            <div className="form-submit-actions">
              {status === 'error' && (
                <span className="form-data-preserved-note">
                  Dữ liệu của bạn được bảo lưu an toàn.
                </span>
              )}

              <SubmitButton
                isLoading={isFormLocked}
                loadingText={status === 'validating' ? 'Đang kiểm tra dữ liệu...' : 'Đang truyền dữ liệu...'}
                text={
                  status === 'success'
                    ? 'Đã Đăng Ký Thành Công'
                    : status === 'submitted_unverified'
                    ? 'Đã Gửi Đăng Ký (Chờ Duyệt)'
                    : 'Hoàn Tất Đăng Ký Tham Dự'
                }
                disabled={isFormLocked || status === 'success'}
              />
            </div>
          </div>
        </FormSection>
      </form>
    </div>
  );
};

export default RegistrationForm;
