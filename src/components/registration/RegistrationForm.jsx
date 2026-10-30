import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Check, FileText, MapPin, User } from 'lucide-react';
import { GALA_EVENT } from '../../data/galaData';
import { REGISTRATION_FIELDS } from '../../data/registrationConfig';
import { TextInput } from '../form/TextInput';
import { RadioGroup } from '../form/RadioGroup';
import { FormSection } from '../form/FormSection';
import { SubmitButton } from '../form/SubmitButton';
import { validateAll, validateField } from '../../utils/validation';
import { getGalaRegistrationStatus, submitGalaRegistration } from '../../services/googleForm';

const INITIAL_VALUES = {
  fullName: '', school: '', schoolOther: '', studentId: '', className: '',
  phone: '', email: '', note: ''
};

export const RegistrationForm = ({ onSubmitService = submitGalaRegistration, onStatusService = getGalaRegistrationStatus }) => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const submittingRef = useRef(false);

  useEffect(() => {
    let active = true;
    const checkAvailability = async () => {
      let availability;
      try {
        availability = await onStatusService();
      } catch {
        availability = 'status_error';
      }
      if (!active) return;
      setStatus((previous) => {
        if (previous === 'submitted' || previous === 'unverified' || previous === 'submitting') return previous;
        if (availability === 'closed') return 'closed';
        if (availability === 'status_error') return 'status_error';
        return ['checking', 'closed', 'status_error'].includes(previous) ? 'idle' : previous;
      });
    };
    checkAvailability();
    const timer = window.setInterval(checkAvailability, 60_000);
    const onFocus = () => checkAvailability();
    window.addEventListener('focus', onFocus);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, [onStatusService]);

  const handleChange = ({ target: { name, value } }) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (status === 'invalid' || status === 'error') {
      setStatus('idle');
      setMessage('');
    }
    if (errors[name] || (name === 'school' && errors.schoolOther)) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value, next),
        ...(name === 'school' ? { schoolOther: validateField('schoolOther', next.schoolOther, next) } : {})
      }));
    }
  };

  const handleBlur = ({ target: { name } }) => {
    setErrors((previous) => ({ ...previous, [name]: validateField(name, values[name], values) }));
  };

  const handleRetryStatus = async () => {
    setStatus('checking');
    try {
      const availability = await onStatusService();
      setStatus((previous) => previous === 'checking' ? (availability === 'open' ? 'idle' : availability) : previous);
    } catch {
      setStatus((previous) => previous === 'checking' ? 'status_error' : previous);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || !['idle', 'invalid', 'error', 'unconfigured'].includes(status)) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('invalid');
      const first = document.getElementById(`group-${Object.keys(nextErrors)[0]}`);
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first?.querySelector('input')?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    setMessage('');
    try {
      const result = await onSubmitService(values);
      setStatus(result.status);
      setMessage(result.message || (result.status === 'closed' ? '' : 'Không thể gửi thông tin đăng ký.'));
      if (result.status !== 'submitted' && result.status !== 'unverified') submittingRef.current = false;
    } catch {
      submittingRef.current = false;
      setStatus('error');
      setMessage('Không thể gửi thông tin đăng ký. Vui lòng thử lại.');
    }
  };

  const input = (name) => (
    <TextInput
      key={name}
      {...REGISTRATION_FIELDS[name]}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors[name]}
    />
  );

  if (status === 'submitted') {
    return (
      <section className="glass-card form-card register-native-form register-outcome" aria-labelledby="register-thanks-title" role="status">
        <div className="form-card-top-accent" aria-hidden="true" />
        <div className="register-outcome-icon" aria-hidden="true"><Check size={32} /></div>
        <p className="register-outcome-kicker">Yêu cầu đăng ký đã được gửi</p>
        <h2 id="register-thanks-title" className="font-display register-outcome-title">Hẹn gặp lại tại {GALA_EVENT.theme}!</h2>
        <p className="register-outcome-description">Cảm ơn bạn đã dành thời gian đăng ký. Vui lòng kiểm tra email: đơn đăng ký chỉ hợp lệ sau khi bạn nhận được email xác nhận từ Ban Tổ chức.</p>
        <div className="register-outcome-details">
          <p><Calendar size={18} aria-hidden="true" />{GALA_EVENT.schedule.dateTime}</p>
          <p><MapPin size={18} aria-hidden="true" />{GALA_EVENT.venue.fullLocation}</p>
        </div>
      </section>
    );
  }

  if (status === 'closed') {
    return (
      <section className="glass-card form-card register-native-form register-outcome" aria-labelledby="register-closed-title" role="status">
        <div className="form-card-top-accent" aria-hidden="true" />
        <div className="register-outcome-icon register-outcome-icon-closed" aria-hidden="true"><Calendar size={30} /></div>
        <p className="register-outcome-kicker">Đăng ký đã kết thúc</p>
        <h2 id="register-closed-title" className="font-display register-outcome-title">Biểu mẫu đã hết hạn</h2>
        <p className="register-outcome-description">Ban Tổ chức hiện không nhận thêm đơn đăng ký qua website. Nếu cần hỗ trợ về vé tham dự, vui lòng liên hệ qua thông tin bên dưới.</p>
      </section>
    );
  }

  if (status === 'checking' || status === 'status_error') {
    return (
      <section className="glass-card form-card register-native-form register-outcome" aria-live="polite">
        <div className="form-card-top-accent" aria-hidden="true" />
        <div className="register-outcome-icon register-outcome-icon-closed" aria-hidden="true"><Calendar size={30} /></div>
        <h2 className="font-display register-outcome-title">{status === 'checking' ? 'Đang kiểm tra đăng ký…' : 'Chưa kiểm tra được biểu mẫu'}</h2>
        <p className="register-outcome-description">{status === 'checking' ? 'Vui lòng chờ trong giây lát.' : 'Không kết nối được với Google Form. Vui lòng thử lại sau.'}</p>
        {status === 'status_error' && <button type="button" className="btn btn-secondary" onClick={handleRetryStatus}>Thử kiểm tra lại</button>}
      </section>
    );
  }

  if (status === 'unverified') {
    return (
      <section className="glass-card form-card register-native-form register-outcome" role="alert" aria-labelledby="register-unverified-title">
        <div className="form-card-top-accent" aria-hidden="true" />
        <h2 id="register-unverified-title" className="font-display register-outcome-title">Chưa xác nhận được kết quả gửi</h2>
        <p className="register-outcome-description">{message}</p>
        <p className="register-outcome-notice">Vui lòng liên hệ Ban Tổ chức qua thông tin bên dưới trước khi gửi lại để tránh trùng đơn.</p>
      </section>
    );
  }

  return (
    <div className="glass-card form-card register-native-form">
      <div className="form-card-top-accent" aria-hidden="true" />
      <form onSubmit={handleSubmit} noValidate aria-label="Biểu mẫu đăng ký vé Standard Solfera" aria-busy={status === 'submitting'}>
        <fieldset className="register-form-fields" disabled={status === 'submitting'}>
        <FormSection
          icon={User}
          title="Thông Tin Cá Nhân"
          description="Các câu hỏi bên dưới tương ứng với biểu mẫu đăng ký chính thức của Ban Tổ chức."
        >
          {input('fullName')}
          <RadioGroup
            {...REGISTRATION_FIELDS.school}
            value={values.school}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.school}
          />
          {values.school === '__other_option__' && input('schoolOther')}
          <div className="grid-2">
            {input('studentId')}
            {input('className')}
          </div>
          <div className="grid-2">
            {input('phone')}
            {input('email')}
          </div>
        </FormSection>

        <FormSection icon={FileText} title="Lời Nhắn Cho Ban Tổ Chức">
          {input('note')}
        </FormSection>
        </fieldset>

        {status === 'invalid' && (
          <p className="register-form-feedback" role="alert">Vui lòng kiểm tra các trường được đánh dấu.</p>
        )}
        {(status === 'error' || status === 'unconfigured') && (
          <div className={`register-form-feedback register-form-feedback-${status}`} role="status" aria-live="polite">
            {message}
          </div>
        )}

        <div className="form-submit-row">
          <div className="form-submit-actions">
            <SubmitButton
              isLoading={status === 'submitting'}
              loadingText="Đang gửi thông tin…"
              text="Gửi đăng ký"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
