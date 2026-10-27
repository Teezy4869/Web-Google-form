import React, { useEffect } from 'react';
import { CheckCircle2, MessageSquare, ExternalLink, RefreshCw, X } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';

export const SuccessModal = ({ isOpen, data, onClose, onReset }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="modal-content" style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ thông báo"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        <div className="success-badge-icon">
          <CheckCircle2 size={40} />
        </div>

        <h2 id="success-modal-title" className="modal-title">Nộp Hồ Sơ Thành Công!</h2>
        <p className="modal-desc">
          Chúc mừng <strong>{data.applicantName}</strong>! Đơn ứng tuyển của bạn đã được ghi nhận vào hệ thống tiếp nhận của <strong>{CLUB_INFO.name}</strong>.
        </p>

        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Họ và tên:</span>
            <span className="summary-value">{data.applicantName}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Email tiếp nhận:</span>
            <span className="summary-value">{data.email}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Ban nguyện vọng 1:</span>
            <span className="summary-value" style={{ color: 'var(--primary)' }}>
              {data.primaryDept}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Thời gian nộp:</span>
            <span className="summary-value">{data.timestamp}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          📧 Vui lòng thường xuyên kiểm tra hòm thư Email (bao gồm cả thư mục Spam/Quảng cáo) để không bỏ lỡ thư mời phỏng vấn Vòng 2 từ Ban Tuyển dụng.
        </p>

        <div className="modal-actions">
          <a
            href={CLUB_INFO.contact.groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageSquare size={18} />
            <span>Tham Gia Group Ứng Viên Zalo</span>
          </a>

          <a
            href={CLUB_INFO.contact.fanpageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <ExternalLink size={18} />
            <span>Theo Dõi Fanpage CLB</span>
          </a>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: '0.5rem', opacity: 0.8 }}
            onClick={() => {
              if (onReset) onReset();
              if (onClose) onClose();
            }}
          >
            <RefreshCw size={16} />
            <span>Nộp Thêm Hồ Sơ Khác</span>
          </button>
        </div>
      </div>
    </div>
  );
};
