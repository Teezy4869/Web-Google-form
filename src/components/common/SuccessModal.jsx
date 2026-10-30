// src/components/common/SuccessModal.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ExternalLink, X, Home, RotateCcw, AlertCircle } from 'lucide-react';
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
          style={{ color: 'var(--champagne)', background: 'rgba(198, 65, 122, 0.16)', borderColor: 'var(--border-gold)' }}
        >
          <Clock size={40} />
        </div>

        <h2 id="success-modal-title" className="modal-title font-display">
          Đơn Đăng Ký Đã Được Tiếp Nhận!
        </h2>
        <p className="modal-desc">
          Thông tin đăng ký vé Standard tham dự <strong>{GALA_EVENT.name}</strong> của <strong>{data.fullName || 'bạn'}</strong> đã được ghi nhận vào hệ thống.
        </p>

        {/* Official Notice Callout */}
        <div
          className="modal-notice-box"
          style={{
            padding: '1rem 1.15rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(198, 65, 122, 0.12)',
            border: '1px solid var(--border-gold)',
            marginBottom: '1.25rem',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <AlertCircle size={20} className="text-gold" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <div style={{ fontSize: '0.86rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.25rem' }}>
                Lưu ý quan trọng từ Ban Tổ Chức:
              </strong>
              <span>
                Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ.
              </span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Họ và tên:</span>
            <span className="summary-value">{data.fullName}</span>
          </div>
          {data.email && (
            <div className="summary-row">
              <span className="summary-label">Email đăng ký:</span>
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
            <span className="summary-value" style={{ color: 'var(--champagne)' }}>
              Đã ghi nhận · Chờ Email xác nhận từ BTC
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Thời gian đăng ký:</span>
            <span className="summary-value">{data.timestamp || new Date().toLocaleString('vi-VN')}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          📧 Vui lòng theo dõi hộp thư Email (kể cả mục Quảng cáo/Spam) để nhận thông báo xác nhận vé chính thức từ Ban Tổ Chức.
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
            href={GALA_EVENT.organizerContact.fanpageUrl || CLUB_INFO.contact.fanpageUrl}
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
