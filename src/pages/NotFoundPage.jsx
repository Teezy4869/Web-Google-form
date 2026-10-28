// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

/**
 * NotFoundPage (Route *)
 * Simple fallback page for unmatched routes
 */
export const NotFoundPage = () => {
  return (
    <div style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.15)',
            color: 'var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}
        >
          <AlertTriangle size={32} />
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>404 - Không Tìm Thấy Trang</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được chuyển hướng về trang sự kiện GALA NIGHT 2026.
        </p>

        <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
          <Home size={18} />
          <span>Trở Về Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

