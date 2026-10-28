// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, MessageCircle, ArrowUp } from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { GALA_EVENT } from '../../data/galaData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Identity & Social Communities */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <img
                src="/assets/images/solfera-logo.webp"
                alt="Solfera Logo"
                className="footer-logo"
                width="42"
                height="42"
                loading="lazy"
              />
              <div className="footer-brand-title-group">
                <h3 className="footer-brand-title font-display">SOLFERA</h3>
                <span className="brand-badge">D-DAY 2026</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              {GALA_EVENT.tagline}. Sự kiện thường niên chính thức của {CLUB_INFO.fullName}.
            </p>

            <div className="footer-social-links">
              <a
                href={CLUB_INFO.contact.fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary footer-social-btn"
                aria-label="Theo dõi Fanpage chính thức YGC / AEP"
              >
                <Facebook size={16} />
                <span>Fanpage YGC / AEP</span>
              </a>

              <a
                href={CLUB_INFO.contact.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary footer-social-btn"
                aria-label="Tham gia cộng đồng Zalo chính thức"
              >
                <MessageCircle size={16} />
                <span>Cộng Đồng Zalo</span>
              </a>
            </div>
          </div>

          {/* Column 2: Organizer & Contact Details */}
          <div className="footer-contact">
            <h4 className="footer-col-title">
              Ban Tổ Chức D-DAY 2026
            </h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} className="text-gold" />
                <span>{GALA_EVENT.organizerContact.email}</span>
              </li>
              <li>
                <Phone size={16} className="text-gold" />
                <span>Hotline: {GALA_EVENT.organizerContact.hotline}</span>
              </li>
              <li>
                <MapPin size={16} className="text-gold" />
                <span>{GALA_EVENT.venue.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="footer-nav">
            <h4 className="footer-col-title">
              Liên Kết Nhanh
            </h4>
            <ul className="footer-contact-list footer-links-list">
              <li>
                <Link to="/" className="footer-link">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/#about" className="footer-link">Về YGC / CLB</Link>
              </li>
              <li>
                <Link to="/#gala" className="footer-link">Sự Kiện D-DAY 2026</Link>
              </li>
              <li>
                <Link to="/register" className="footer-link text-gold" style={{ fontWeight: 600 }}>
                  Đăng Ký Tham Dự
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar with Copyright & Back to Top */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} SOLFERA – D-DAY 2026 | {CLUB_INFO.name}. Tất cả quyền được bảo lưu.
          </p>
          <button
            type="button"
            className="btn btn-secondary footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
          >
            <ArrowUp size={14} />
            <span>Lên đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
