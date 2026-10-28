// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Ticket,
  Calendar,
  MapPin,
  Info,
  HelpCircle,
  Phone,
  Mail,
  Facebook,
  Sparkles
} from 'lucide-react';
import { GALA_EVENT } from '../data/galaData';
import { CLUB_INFO } from '../data/clubData';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { SuccessModal } from '../components/common/SuccessModal';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * RegisterPage (Route /register) — Solfera D-DAY 2026 | YGC/AEP
 * Page Structure:
 * - Shared Navbar (rendered by RootLayout)
 * - Solfera D-DAY 2026 heading (h1)
 * - Brief event information strip (Time & Venue)
 * - Registration instructions (h2)
 * - Single-Page Controlled Registration Form (RegistrationForm.jsx)
 * - Support / Contact Information (h2)
 * - Shared Footer (rendered by RootLayout)
 */
export const RegisterPage = () => {
  useScrollReveal();

  const [successData, setSuccessData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSuccess = (submittedData, meta = { verified: true }) => {
    setSuccessData({
      ...submittedData,
      isVerified: meta.verified !== false
    });
    setIsSuccessModalOpen(true);
  };

  const handleReset = () => {
    setFormKey((prev) => prev + 1);
    setSuccessData(null);
  };

  const timeDisplay = GALA_EVENT.schedule.dateTime || 'Đang cập nhật';
  const venueDisplay = GALA_EVENT.venue.name || 'Hội trường lớn PTIT, Hà Nội (Đang cập nhật)';

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
            <span>Phiếu Đăng Ký Tham Dự</span>
          </span>
          <h1 className="section-title font-display">
            Đăng Ký Tham Dự <span className="text-gradient">{GALA_EVENT.name}</span>
          </h1>
          <p className="section-desc">
            Đại sự kiện nghệ thuật tri ân, vinh danh và kết nối thế hệ {CLUB_INFO.fullName}. Vui lòng hoàn tất thông tin bên dưới để Ban Tổ Chức xuất vé mời điện tử và giữ chỗ ngồi đẹp nhất.
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

        {/* 3. Registration Instructions */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem 1.85rem',
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, rgba(198, 65, 122, 0.08) 0%, rgba(26, 8, 12, 0.85) 100%)',
            borderLeft: '4px solid var(--champagne)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <Info size={22} className="text-gold" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
            <div>
              <h2 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 600 }}>
                Quy Trình Nhận Vé Mời Điện Tử (E-Ticket)
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <li>• <strong>Bước 1:</strong> Điền đầy đủ và kiểm tra thông tin liên hệ trong biểu mẫu bên dưới.</li>
                <li>• <strong>Bước 2:</strong> Bấm xác nhận đăng ký để hệ thống lưu giữ chỗ ngồi của bạn.</li>
                <li>• <strong>Bước 3:</strong> Kiểm tra hộp thư Email để nhận vé điện tử kèm mã QR check-in tại cửa hội trường.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Single-Page Controlled Registration Form */}
        <RegistrationForm
          key={formKey}
          onSuccess={handleSuccess}
        />

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

            <a
              href={CLUB_INFO.contact.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary register-support-btn"
            >
              <Facebook size={15} className="text-gold" />
              <span>Fanpage {CLUB_INFO.name}</span>
            </a>
          </div>
        </div>

        {/* 6. Success / Unverified Confirmation Modal */}
        <SuccessModal
          isOpen={isSuccessModalOpen}
          data={successData}
          onClose={() => setIsSuccessModalOpen(false)}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
