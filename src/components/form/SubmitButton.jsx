// src/components/form/SubmitButton.jsx
import React from 'react';
import { Send } from 'lucide-react';

export const SubmitButton = ({
  isLoading = false,
  loadingText = 'Đang nộp hồ sơ...',
  text = 'Xác Nhận Nộp Đơn Ứng Tuyển',
  disabled = false,
  onClick
}) => {
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Send size={18} />
          <span>{text}</span>
        </>
      )}
    </button>
  );
};
