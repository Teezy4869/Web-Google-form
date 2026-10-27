// src/components/common/Footer.jsx
import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Facebook, MessageCircle } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Sparkles className="text-primary" size={24} />
              <h3 style={{ margin: 0 }}>{CLUB_INFO.name}</h3>
            </div>
            <p style={{ maxWidth: '420px', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
              {CLUB_INFO.fullName} — {CLUB_INFO.tagline}. Môi trường rèn luyện thực chiến, gắn kết và phát triển tài năng trẻ.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={CLUB_INFO.contact.fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                <Facebook size={16} />
                <span>Fanpage</span>
              </a>
              <a
                href={CLUB_INFO.contact.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                <MessageCircle size={16} />
                <span>Group Zalo</span>
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: '#ffffff' }}>Liên Hệ</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} className="text-primary" />
                <span>{CLUB_INFO.contact.email}</span>
              </li>
              <li>
                <Phone size={16} className="text-primary" />
                <span>{CLUB_INFO.contact.hotline}</span>
              </li>
              <li>
                <MapPin size={16} className="text-primary" />
                <span>{CLUB_INFO.contact.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: '#ffffff' }}>Liên Kết Nhanh</h4>
            <ul className="footer-contact-list">
              <li><a href="#hero">Trang Chủ</a></li>
              <li><a href="#about">Giới Thiệu CLB</a></li>
              <li><a href="#timeline">Lộ Trình Tuyển</a></li>
              <li><a href="#departments">Ban Chuyên Môn</a></li>
              <li><a href="#application">Đơn Ứng Tuyển</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {CLUB_INFO.name}. Bản quyền thuộc về Ban Chủ nhiệm CLB.</p>
        </div>
      </div>
    </footer>
  );
};
