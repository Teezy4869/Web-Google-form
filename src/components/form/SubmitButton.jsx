// src/components/form/SubmitButton.jsx
import React from 'react';
import { Send, Sparkles } from 'lucide-react';

export const SubmitButton = ({
  isLoading = false,
  loadingText = 'Đang gửi đăng ký...',
  text = 'Xác Nhận Đăng Ký Tham Dự',
  disabled = false,
  onClick
}) => {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-cta submit-btn-luxury"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="spinner submit-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Send size={18} className="submit-btn-icon" />
          <span className="submit-btn-text">{text}</span>
          <Sparkles size={16} className="submit-btn-sparkle text-gold" aria-hidden="true" />
        </>
      )}
    </button>
  );
};

export default SubmitButton;
