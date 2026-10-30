// src/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  Ticket,
  Calendar,
  MapPin,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';
import { GALA_EVENT } from '../data/galaData';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * RegisterPage (Route /register) — Solfera D-DAY 2026 | GYC - AEP
 * Page Structure:
 * - Shared Navbar (rendered by RootLayout)
 * - Solfera D-DAY 2026 heading (h1)
 * - Brief event information strip (Time & Venue)
 * - Registration notice and native form connected to Google Forms
 * - Support / Contact Information (h2)
 * - Shared Footer (rendered by RootLayout)
 */
export const RegisterPage = () => {
  useScrollReveal();

  const timeDisplay = `${GALA_EVENT.schedule.dateTime} · Check-in: ${GALA_EVENT.schedule.checkInTime}`;
  const venueDisplay = GALA_EVENT.venue.fullLocation;

  return (
    <div className="register-page-content" style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container form-wrapper">
        {/* Back navigation button */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Link
            to="/"
            className="btn btn-secondary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.86rem' }}
          >
            <ArrowLeft size={16} />
            <span>Quay Lại Trang Chủ</span>
          </Link>
        </div>

        {/* 1. Solfera D-DAY Heading */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <Ticket size={14} className="text-gold" />
            <span>Phiếu Đăng Ký Vé Standard</span>
          </span>
          <h1 className="section-title font-display">
            Đăng Ký Tham Dự <span className="text-gradient">{GALA_EVENT.name}</span>
          </h1>
          <p className="section-desc">
            Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: "SOLFERA".
          </p>
        </div>

        {/* 2. Brief Event Information Strip */}
        <div
          className="glass-card"
          style={{
            padding: '1.75rem 2rem',
            marginBottom: '2rem',
            borderColor: 'var(--border-gold)',
            background: 'linear-gradient(135deg, rgba(38, 12, 18, 0.85) 0%, rgba(20, 6, 9, 0.95) 100%)'
          }}
        >
          <div className="grid-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(198, 65, 122, 0.16)',
                  color: 'var(--champagne)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--border-gold)'
                }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Thời Gian Sự Kiện
                </span>
                <p style={{ fontSize: '0.96rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{timeDisplay}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(198, 65, 122, 0.16)',
                  color: 'var(--champagne)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--border-gold)'
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Địa Điểm Tổ Chức
                </span>
                <p style={{ fontSize: '0.96rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{venueDisplay}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Official Registration Notice */}
        <div
          className="registration-notice-banner"
          role="region"
          aria-label="Lưu ý đăng ký vé"
          style={{ marginBottom: '2.5rem' }}
        >
          <div className="notice-banner-header">
            <AlertCircle size={22} className="notice-banner-icon" aria-hidden="true" />
            <h2 className="notice-banner-title font-display">Lưu ý:</h2>
          </div>
          <ul className="notice-banner-list">
            <li>Mỗi lượt đăng ký sẽ tương ứng với 01 vé.</li>
            <li>Do số lượng khán giả có hạn, đơn đăng ký chỉ hợp lệ khi bạn nhận được email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ Thế hệ trẻ AEP.</li>
          </ul>
        </div>

        {/* 4. Native form submits its mapped answers to the published Google Form. */}
        <RegistrationForm />

        {/* 5. Support & Contact Information */}
        <div
          className="glass-card"
          style={{
            marginTop: '3.5rem',
            padding: '2rem 2.25rem',
            textAlign: 'center',
            borderColor: 'var(--border-subtle)',
            background: 'rgba(26, 8, 12, 0.75)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(198, 65, 122, 0.16)',
              color: 'var(--champagne)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}
          >
            <HelpCircle size={24} />
          </div>
          <h2 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 600 }}>
            Bạn Cần Hỗ Trợ Về Vé Tham Dự?
          </h2>
          <p style={{ maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Nếu bạn gặp khó khăn trong quá trình đăng ký hoặc có câu hỏi về sự kiện, hãy liên hệ ngay với Ban Tổ Chức qua các kênh:
          </p>

          <div className="register-support-actions">
            <a
              href={`tel:${GALA_EVENT.organizerContact.hotline.replace(/\s/g, '')}`}
              className="btn btn-secondary register-support-btn"
            >
              <Phone size={15} className="text-gold" />
              <span>Hotline: {GALA_EVENT.organizerContact.hotline}</span>
            </a>

            <a
              href={`mailto:${GALA_EVENT.organizerContact.email}`}
              className="btn btn-secondary register-support-btn"
            >
              <Mail size={15} className="text-gold" />
              <span>Email: {GALA_EVENT.organizerContact.email}</span>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
