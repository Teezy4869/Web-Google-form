// src/components/common/SuccessModal.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ExternalLink, X, Home, RotateCcw } from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { GALA_EVENT } from '../../data/galaData';

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

  const isVerified = data.isVerified !== false;

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
          aria-label="Đóng thông báo"
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
            justifyContent: 'center',
            transition: 'color var(--transition-fast)'
          }}
        >
          <X size={20} />
        </button>

        <div
          className="success-badge-icon"
          style={!isVerified ? { color: 'var(--champagne)', background: 'rgba(198, 65, 122, 0.16)', borderColor: 'var(--border-gold)' } : {}}
        >
          {isVerified ? <CheckCircle2 size={40} /> : <Clock size={40} />}
        </div>

        <h2 id="success-modal-title" className="modal-title font-display">
          {isVerified ? 'Đăng Ký Thành Công!' : 'Đã Tiếp Nhận Đăng Ký!'}
        </h2>
        <p className="modal-desc">
          {isVerified ? (
            <>
              Chúc mừng <strong>{data.fullName || 'bạn'}</strong>! Thông tin đăng ký tham dự <strong>{GALA_EVENT.name}</strong> đã được hệ thống xác nhận chính thức.
            </>
          ) : (
            <>
              Thông tin đăng ký của <strong>{data.fullName || 'bạn'}</strong> đã được ghi nhận vào hệ thống. Ban Tổ Chức sẽ đối soát và gửi vé mời điện tử qua email.
            </>
          )}
        </p>

        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Họ và tên:</span>
            <span className="summary-value">{data.fullName}</span>
          </div>
          {data.email && (
            <div className="summary-row">
              <span className="summary-label">Email xác nhận:</span>
              <span className="summary-value">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="summary-row">
              <span className="summary-label">Số điện thoại:</span>
              <span className="summary-value">{data.phone}</span>
            </div>
          )}
          {data.attendeeType && (
            <div className="summary-row">
              <span className="summary-label">Tư cách tham dự:</span>
              <span className="summary-value text-gold">
                {data.attendeeType}
              </span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-label">Trạng thái:</span>
            <span className="summary-value" style={{ color: isVerified ? 'var(--success)' : 'var(--champagne)' }}>
              {isVerified ? 'Đã xác thực' : 'Đang chờ duyệt email'}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Thời gian đăng ký:</span>
            <span className="summary-value">{data.timestamp || new Date().toLocaleString('vi-VN')}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          📧 Vui lòng kiểm tra hòm thư Email để nhận vé điện tử (E-ticket) và hướng dẫn check-in tại cửa hội trường từ Ban Tổ Chức.
        </p>

        <div className="modal-actions">
          {onReset && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                onReset();
              }}
            >
              <RotateCcw size={16} />
              <span>Đăng Ký Thêm Người Khác</span>
            </button>
          )}

          <a
            href={CLUB_INFO.contact.fanpageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink size={18} />
            <span>Theo Dõi Fanpage {CLUB_INFO.name}</span>
          </a>

          <Link
            to="/"
            className="btn btn-secondary"
            onClick={onClose}
          >
            <Home size={16} />
            <span>Trở Về Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
