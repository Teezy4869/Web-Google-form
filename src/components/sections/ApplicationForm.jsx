// src/components/sections/ApplicationForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Compass,
  FileCheck2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import {
  DEPARTMENT_OPTIONS,
  SECONDARY_DEPARTMENT_OPTIONS,
  TIME_COMMITMENT_OPTIONS,
  DISCOVERY_CHANNELS,
  COMMITMENT_TEXT,
  DEPARTMENTS
} from '../../data/recruitmentData';
import { TextInput } from '../form/TextInput';
import { TextArea } from '../form/TextArea';
import { RadioGroup } from '../form/RadioGroup';
import { CheckboxGroup } from '../form/CheckboxGroup';
import { SingleCheckbox } from '../form/SingleCheckbox';
import { FormSection } from '../form/FormSection';
import { SubmitButton } from '../form/SubmitButton';
import { validateField, validateStep, validateAll } from '../../utils/validation';
import { submitRecruitmentForm } from '../../services/googleForm';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  studentId: '',
  major: '',
  facebookUrl: '',
  primaryDept: '',
  secondaryDept: 'Không có nguyện vọng 2',
  reason: '',
  strengthsWeaknesses: '',
  timeCommitment: '',
  skillsExperience: '',
  portfolioUrl: '',
  scenarioAnswer: '',
  channels: [],
  commitment: false
};

const DRAFT_STORAGE_KEY = 'ttv_recruitment_draft_v1';

export const ApplicationForm = ({ preselectedDept, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_FORM_STATE;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const formTopRef = useRef(null);

  // Sync preselected department if triggered from external CTA
  useEffect(() => {
    if (preselectedDept) {
      setFormData((prev) => ({ ...prev, primaryDept: preselectedDept }));
    }
  }, [preselectedDept]);

  // Persist form draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore storage error
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Clear error on change if valid
      if (errors[name]) {
        const error = validateField(name, value, updated);
        setErrors((prevErr) => ({ ...prevErr, [name]: error }));
      }
      return updated;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const error = validateField(name, formData[name], formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const scrollToFirstError = (stepErrors) => {
    const firstFieldKey = Object.keys(stepErrors)[0];
    if (firstFieldKey) {
      const element = document.getElementById(`group-${firstFieldKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = element.querySelector('input, textarea');
        if (input) input.focus();
      }
    }
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      scrollToFirstError(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ thông tin đã nhập và điền lại từ đầu?')) {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setCurrentStep(1);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    setSubmitError(null);

    // Full schema validation
    const allErrors = validateAll(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // If error belongs to previous step, jump to that step
      const step1Fields = ['fullName', 'email', 'phone', 'studentId', 'major', 'facebookUrl'];
      const step2Fields = ['primaryDept', 'secondaryDept', 'reason', 'strengthsWeaknesses', 'timeCommitment'];
      const step3Fields = ['skillsExperience', 'portfolioUrl', 'scenarioAnswer'];

      if (step1Fields.some((f) => allErrors[f])) {
        setCurrentStep(1);
      } else if (step2Fields.some((f) => allErrors[f])) {
        setCurrentStep(2);
      } else if (step3Fields.some((f) => allErrors[f])) {
        setCurrentStep(3);
      }

      setTimeout(() => scrollToFirstError(allErrors), 100);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitRecruitmentForm(formData);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      setSubmitError(
        err.message ||
          'Đã xảy ra sự cố khi kết nối tới máy chủ tiếp nhận. Dữ liệu của bạn vẫn được lưu giữ an toàn, vui lòng thử lại!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormKeyDown = (e) => {
    // If Enter key is pressed inside an input field (not textarea) and not on step 4, advance to next step
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (currentStep < 4) {
        handleNextStep();
      }
    }
  };

  // Find dynamic scenario prompt based on primary department
  const selectedDeptObj = DEPARTMENTS.find((d) => d.name === formData.primaryDept);
  const scenarioHelperText = selectedDeptObj
    ? `Tình huống tham khảo dành cho ${selectedDeptObj.name}: "${selectedDeptObj.scenarioPrompt}"`
    : 'Vui lòng hoàn thành câu trả lời tình huống xử lý công việc.';

  const stepsMeta = [
    { number: 1, label: 'Thông tin cá nhân', icon: User },
    { number: 2, label: 'Định hướng & Chung', icon: Compass },
    { number: 3, label: 'Đánh giá chuyên môn', icon: FileCheck2 },
    { number: 4, label: 'Cam kết & Nộp đơn', icon: CheckCircle }
  ];

  return (
    <section id="application" className="application-section">
      <div className="container form-wrapper" ref={formTopRef}>
        <div className="section-header">
          <span className="section-tag">Đơn Ứng Tuyển</span>
          <h2 className="section-title">Hồ Sơ Đăng Ký Trực Tuyến</h2>
          <p className="section-desc">
            Vui lòng điền thông tin trung thực và đầy đủ. Dữ liệu của bạn được tự động lưu tạm trên trình duyệt.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="step-bar" aria-label="Form step progress">
          <div
            className="step-progress-fill"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
          {stepsMeta.map((s) => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;

            return (
              <div
                key={s.number}
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (s.number < currentStep) setCurrentStep(s.number);
                }}
              >
                <div className="step-circle">
                  {isCompleted ? '✓' : s.number}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="glass-card form-card">
          <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} noValidate>
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <FormSection
                icon={User}
                title="Phần 1: Thông tin Ứng viên"
                description="Cung cấp thông tin định danh và phương thức liên hệ chính xác để Ban Tuyển dụng gửi thư mời phỏng vấn."
              >
                <TextInput
                  id="fullName"
                  name="fullName"
                  label="Họ và tên ứng viên"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.fullName}
                  helperText="Họ và tên đầy đủ có dấu theo giấy tờ tùy thân."
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    label="Địa chỉ Email liên hệ"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    helperText="Email chính thức nhận lịch phỏng vấn và kết quả."
                  />

                  <TextInput
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Số điện thoại / Zalo"
                    required
                    placeholder="0987654321"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    helperText="Số điện thoại đang hoạt động hoặc liên kết Zalo."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <TextInput
                    id="studentId"
                    name="studentId"
                    label="Mã số sinh viên (MSSV)"
                    required
                    placeholder="Ví dụ: B23DCCN001"
                    value={formData.studentId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.studentId}
                  />

                  <TextInput
                    id="major"
                    name="major"
                    label="Ngành học & Khóa"
                    required
                    placeholder="Ví dụ: Công nghệ thông tin - D23"
                    value={formData.major}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.major}
                  />
                </div>

                <TextInput
                  id="facebookUrl"
                  name="facebookUrl"
                  type="url"
                  label="Đường link Facebook cá nhân"
                  required
                  placeholder="https://facebook.com/username"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.facebookUrl}
                  helperText="Đường dẫn trang cá nhân Facebook để CLB liên hệ và add vào group."
                />
              </FormSection>
            )}

            {/* STEP 2: Preferences & General Questions */}
            {currentStep === 2 && (
              <FormSection
                icon={Compass}
                title="Phần 2: Định hướng Ứng tuyển & Câu hỏi Chung"
                description="Lựa chọn ban mong muốn cống hiến và chia sẻ động lực, quỹ thời gian của bản thân."
              >
                <RadioGroup
                  name="primaryDept"
                  label="Nguyện vọng 1 (Ban chính ứng tuyển)"
                  required
                  options={DEPARTMENT_OPTIONS}
                  value={formData.primaryDept}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.primaryDept}
                  helperText="Ban chuyên môn mà bạn mong muốn được học hỏi và cống hiến nhiều nhất."
                />

                <RadioGroup
                  name="secondaryDept"
                  label="Nguyện vọng 2 (Ban phụ ứng tuyển)"
                  options={SECONDARY_DEPARTMENT_OPTIONS}
                  value={formData.secondaryDept}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.secondaryDept}
                  helperText="Ban dự phòng nếu bạn chưa đạt tiêu chí tại Nguyện vọng 1 (tùy chọn)."
                />

                <TextArea
                  id="reason"
                  name="reason"
                  label="Lý do bạn mong muốn trở thành thành viên của CLB?"
                  required
                  placeholder="Chia sẻ lý do bạn biết đến CLB, điều gì thu hút bạn nhất và mong muốn đạt được sau mùa tuyển quân..."
                  minLength={50}
                  maxLength={1500}
                  value={formData.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.reason}
                />

                <TextArea
                  id="strengthsWeaknesses"
                  name="strengthsWeaknesses"
                  label="Chia sẻ về điểm mạnh và điểm yếu lớn nhất của bạn"
                  required
                  placeholder="Điểm mạnh trong công việc/tính cách và những mặt bạn đang nỗ lực cải thiện..."
                  minLength={50}
                  maxLength={1500}
                  value={formData.strengthsWeaknesses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.strengthsWeaknesses}
                />

                <RadioGroup
                  name="timeCommitment"
                  label="Thời gian bạn có thể cam kết dành cho các hoạt động của CLB mỗi tuần?"
                  required
                  options={TIME_COMMITMENT_OPTIONS}
                  value={formData.timeCommitment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.timeCommitment}
                />
              </FormSection>
            )}

            {/* STEP 3: Specialized Assessment */}
            {currentStep === 3 && (
              <FormSection
                icon={FileCheck2}
                title="Phần 3: Đánh giá Chuyên môn & Tình huống"
                description={`Thể hiện kỹ năng và tư duy giải quyết vấn đề của bạn${formData.primaryDept ? ` đối với ${formData.primaryDept}` : ''}.`}
              >
                <TextArea
                  id="skillsExperience"
                  name="skillsExperience"
                  label="Kinh nghiệm và các kỹ năng chuyên môn liên quan đến Ban đã chọn"
                  required
                  placeholder="Trình bày các kỹ năng, công cụ đã từng sử dụng (lập trình, thiết kế, tổ chức sự kiện, viết bài...) hoặc các hoạt động đã tham gia..."
                  minLength={30}
                  maxLength={2000}
                  value={formData.skillsExperience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.skillsExperience}
                />

                <TextInput
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  label="Link Portfolio / CV / Sản phẩm mẫu"
                  placeholder="https://drive.google.com/drive/folders/... hoặc https://github.com/..."
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.portfolioUrl}
                  helperText="Tùy chọn. Cung cấp liên kết Drive (mở quyền xem), Behance, GitHub hoặc Canva để tăng điểm ấn tượng hồ sơ."
                />

                <TextArea
                  id="scenarioAnswer"
                  name="scenarioAnswer"
                  label="Giải quyết tình huống thực tế của Ban"
                  required
                  placeholder="Trình bày giải pháp cụ thể và góc nhìn xử lý tình huống của bạn..."
                  minLength={50}
                  maxLength={2000}
                  value={formData.scenarioAnswer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.scenarioAnswer}
                  helperText={scenarioHelperText}
                />
              </FormSection>
            )}

            {/* STEP 4: Survey, Review & Submit */}
            {currentStep === 4 && (
              <FormSection
                icon={CheckCircle}
                title="Phần 4: Khảo sát, Rà soát & Cam kết"
                description="Rà soát lại toàn bộ thông tin đã điền và xác nhận cam kết trước khi gửi hồ sơ chính thức."
              >
                <CheckboxGroup
                  name="channels"
                  label="Bạn biết đến đợt tuyển quân lần này qua kênh thông tin nào?"
                  options={DISCOVERY_CHANNELS}
                  values={formData.channels}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.channels}
                  helperText="Chọn tối đa 3 kênh thông tin (tùy chọn)."
                  maxChoices={3}
                />

                {/* Summary Box */}
                <div style={{ margin: '2rem 0', background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: '#ffffff' }}>
                    Tóm Tắt Hồ Sơ Ứng Tuyển
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Ứng viên: </span>
                      <strong style={{ color: '#fff' }}>{formData.fullName || '(Chưa nhập)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>MSSV: </span>
                      <strong style={{ color: '#fff' }}>{formData.studentId || '(Chưa nhập)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Email: </span>
                      <strong style={{ color: '#fff' }}>{formData.email || '(Chưa nhập)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>SĐT: </span>
                      <strong style={{ color: '#fff' }}>{formData.phone || '(Chưa nhập)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Nguyện vọng 1: </span>
                      <strong style={{ color: 'var(--primary)' }}>{formData.primaryDept || '(Chưa chọn)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-dim)' }}>Nguyện vọng 2: </span>
                      <strong style={{ color: '#fff' }}>{formData.secondaryDept}</strong>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      onClick={() => setCurrentStep(1)}
                    >
                      ✏️ Sửa Thông Tin (B1)
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      onClick={() => setCurrentStep(2)}
                    >
                      ✏️ Sửa Nguyện Vọng (B2)
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      onClick={() => setCurrentStep(3)}
                    >
                      ✏️ Sửa Chuyên Môn (B3)
                    </button>
                  </div>
                </div>

                <SingleCheckbox
                  id="commitment"
                  name="commitment"
                  label={COMMITMENT_TEXT}
                  required
                  checked={formData.commitment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.commitment}
                />

                {submitError && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      background: 'var(--error-bg)',
                      border: '1px solid var(--error-border)',
                      color: 'var(--error)',
                      marginTop: '1.5rem',
                      fontSize: '0.92rem'
                    }}
                    role="alert"
                  >
                    <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                    <span>{submitError}</span>
                  </div>
                )}
              </FormSection>
            )}

            {/* Navigation Actions */}
            <div className="form-actions">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft size={16} />
                    <span>Quay Lại</span>
                  </button>
                )}

                {currentStep === 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ opacity: 0.7 }}
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    <RotateCcw size={15} />
                    <span>Làm mới</span>
                  </button>
                )}
              </div>

              <div>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    <span>Tiếp Tục</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <SubmitButton
                    isLoading={isSubmitting}
                    loadingText="Đang nộp hồ sơ..."
                    text="Xác Nhận Nộp Đơn Ứng Tuyển"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
