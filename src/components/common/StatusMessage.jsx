// src/components/common/StatusMessage.jsx
import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Clock, Loader2, X, ShieldAlert } from 'lucide-react';

/**
 * Reusable Status Message & Feedback Component — Solfera D-DAY 2026
 * Supports states: 'idle' | 'validating' | 'submitting' | 'submitted_unverified' | 'success' | 'error' | 'unconfigured'
 */
export const StatusMessage = ({
  status = 'idle',
  title,
  message,
  onDismiss,
  actionButton
}) => {
  if (status === 'idle' || (!message && !title)) {
    return null;
  }

  const getConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle2,
          badge: 'Xác Nhận Thành Công',
          badgeClass: 'status-tag-success',
          cardClass: 'status-card-success',
          color: 'var(--success)',
          defaultTitle: 'Đăng Ký Thành Công!'
        };
      case 'submitted_unverified':
        return {
          icon: Clock,
          badge: 'Đã Tiếp Nhận • Chờ Duyệt Email',
          badgeClass: 'status-tag-gold',
          cardClass: 'status-card-gold',
          color: 'var(--champagne)',
          defaultTitle: 'Thông Tin Đã Được Tiếp Nhận'
        };
      case 'unconfigured':
        return {
          icon: ShieldAlert,
          badge: 'Chế Độ An Toàn (Safeguard)',
          badgeClass: 'status-tag-amber',
          cardClass: 'status-card-amber',
          color: 'var(--champagne)',
          defaultTitle: 'Biểu Mẫu Tiếp Nhận Đang Chờ Cấu Hình'
        };
      case 'error':
        return {
          icon: AlertCircle,
          badge: 'Sự Cố Kết Nối • Dữ Liệu An Toàn',
          badgeClass: 'status-tag-error',
          cardClass: 'status-card-error',
          color: 'var(--error)',
          defaultTitle: 'Chưa Thể Hoàn Tất Đăng Ký'
        };
      case 'validating':
      case 'submitting':
        return {
          icon: Loader2,
          isSpinning: true,
          badge: status === 'validating' ? 'Kiểm Tra Dữ Liệu' : 'Đang Xử Lý Gửi Đơn',
          badgeClass: 'status-tag-rose',
          cardClass: 'status-card-loading',
          color: 'var(--primary)',
          defaultTitle: status === 'validating' ? 'Đang Kiểm Tra Dữ Liệu...' : 'Đang Gửi Thông Tin Đăng Ký...'
        };
      default:
        return {
          icon: Clock,
          badge: 'Thông Báo',
          badgeClass: 'status-tag-gold',
          cardClass: 'status-card-gold',
          color: 'var(--champagne)',
          defaultTitle: 'Thông Báo'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;
  const isLoading = status === 'submitting' || status === 'validating';

  return (
    <div
      className={`glass-card status-message-card ${config.cardClass}`}
      data-status={status}
      role="alert"
      aria-live="polite"
    >
      {/* Top accent glow line */}
      <div className="status-top-accent" />

      {/* Loading progress bar */}
      {isLoading && <div className="status-progress-shimmer" />}

      <div className="status-message-layout">
        <div className="status-icon-wrapper" style={{ color: config.color }}>
          <Icon size={24} className={config.isSpinning ? 'status-spin' : ''} />
        </div>

        <div className="status-body">
          <div className="status-header-row">
            <span className={`status-badge-pill ${config.badgeClass}`}>
              {config.badge}
            </span>
            <h4 className="status-title font-display">
              {title || config.defaultTitle}
            </h4>
          </div>

          {message && <div className="status-desc">{message}</div>}

          {actionButton && <div className="status-actions">{actionButton}</div>}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="status-dismiss-btn"
            aria-label="Đóng thông báo"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusMessage;
