// src/components/home/GalaSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  MapPin,
  Ticket,
  Clock,
  ArrowRight,
  Users,
  Crown
} from 'lucide-react';
import { GALA_EVENT } from '../../data/galaData';
import { CLUB_INFO } from '../../data/clubData';
import { CountdownTimer } from '../common/CountdownTimer';

/**
 * SOLFERA – D-DAY 2026 Event Section
 * Features:
 * - Event Series: CHUỖI SỰ KIỆN CHÀO SINH VIÊN D-DAY 2026: “SOLFERA” (Pages 2-3)
 * - Event Meaning & Storytelling (Theme: “Song of Triumph, Spark of Wisdom”)
 * - Official Key Visual Masterpiece Showcase Frame (Strict 16:9 aspect ratio, no crop/distortion)
 * - Schedule & Venue Information (Hội trường A2, ĐH Kinh tế Quốc dân, 18:30 05/11/2026)
 * - Countdown Timer
 * - Primary Registration CTA linking directly to /register via React Router
 */
export const GalaSection = () => {
  const getTimelineIcon = (id) => {
    switch (id) {
      case 'teambuilding':
        return <Users size={20} className="text-gold" />;
      case 'king_queen':
        return <Crown size={20} className="text-gold" />;
      case 'gala_night':
        return <Sparkles size={20} className="text-gold" />;
      default:
        return <Calendar size={20} className="text-gold" />;
    }
  };

  const timeDisplay = GALA_EVENT.schedule.dateTime;
  const checkInDisplay = GALA_EVENT.schedule.checkInTime || GALA_EVENT.schedule.doorsOpen;
  const venueDisplay = GALA_EVENT.venue.name;
  const addressDisplay = GALA_EVENT.venue.address;

  return (
    <section id="gala" className="section gala-section" aria-label="Sự kiện SOLFERA – D-DAY 2026">
      <div className="container">
        {/* Section Header: Official Series Title & Clean Kicker (Redundant theme subtitle removed per Page 2) */}
        <div className="section-header reveal">
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>{GALA_EVENT.seriesKicker}</span>
          </span>
          <h2 className="section-title">
            D-DAY 2026: <span className="text-gradient font-display">“SOLFERA”</span>
          </h2>
        </div>

        {/* Meaning & Storytelling Card with Official Key Visual Showcase */}
        <div className="glass-card gala-meaning-card reveal" style={{ marginBottom: '4.5rem' }}>
          <div className="gala-meaning-grid">
            {/* Left Column: Storytelling & Meaning Text */}
            <div className="gala-meaning-text">
              <div className="meaning-kicker-wrapper">
                <span className="badge badge-primary">
                  <Sparkles size={13} className="text-gold" />
                  <span>{GALA_EVENT.meaningHeading}</span>
                </span>
              </div>

              <h3 className="meaning-heading font-display">
                “Song of Triumph, <span className="text-gradient">Spark of Wisdom”</span>
              </h3>

              <p className="meaning-lead">
                {GALA_EVENT.meaningParagraph1}
              </p>

              <p className="meaning-desc">
                {GALA_EVENT.meaningParagraph2}
              </p>

              {/* Official Event Timeline (Customer PDF Page 4) */}
              <div className="meaning-values-grid timeline-values-grid" aria-label="Lộ trình sự kiện">
                {GALA_EVENT.timeline.map((item) => (
                  <div key={item.id} className="meaning-value-item timeline-value-item">
                    <div className="meaning-value-icon timeline-value-icon">
                      {getTimelineIcon(item.id)}
                    </div>
                    <div className="meaning-value-content">
                      <h4 className="meaning-value-title timeline-value-title">{item.title}</h4>
                      <div className="timeline-date-badge">
                        <Calendar size={13} className="text-gold" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Official Key Visual Masterpiece Showcase Frame */}
            <div className="gala-poster-wrapper">
              <div className="solfera-visual-showcase-frame glass-card reveal-scale">
                {/* Floating Top Badge */}
                <div className="solfera-visual-badge">
                  <span className="brand-badge">
                    <Sparkles size={12} />
                    <span>OFFICIAL KEY VISUAL</span>
                  </span>
                </div>

                {/* Media Frame strictly 16:9 - Zero Distortion, Zero Crop */}
                <div className="solfera-visual-media">
                  <img
                    src={GALA_EVENT.media.poster}
                    alt="Key Visual chính thức Solfera – D-DAY 2026 | GYC - AEP"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="674"
                    className="solfera-visual-img"
                  />
                  <div className="solfera-visual-overlay" />
                </div>

                {/* Frame Footer Metadata Strip */}
                <div className="solfera-visual-footer">
                  <div className="visual-footer-info">
                    <span className="visual-footer-label">ẤN PHẨM NHẬN DIỆN CHÍNH THỨC</span>
                    <span className="visual-footer-title">D-DAY 2026: “SOLFERA”</span>
                  </div>
                  <div className="visual-footer-tag">
                    <span>GYC - Câu lạc bộ Thế hệ trẻ AEP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Venue Strip */}
        <div className="glass-card gala-info-strip reveal" style={{ marginBottom: '4.5rem' }}>
          <div className="grid-2">
            {/* Time Card */}
            <div className="gala-info-block">
              <div className="gala-info-icon">
                <Calendar size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.35rem' }}>Thời Gian Tổ Chức</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>{timeDisplay}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  <Clock size={14} />
                  <span>Thời gian check-in: {checkInDisplay}</span>
                </div>
              </div>
            </div>

            {/* Venue Card */}
            <div className="gala-info-block">
              <div className="gala-info-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.35rem' }}>Địa Điểm Tổ Chức</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>{venueDisplay}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                  {addressDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Countdown */}
        <div className="reveal" style={{ marginBottom: '4.5rem' }}>
          <CountdownTimer
            targetDate={GALA_EVENT.schedule.isoDate}
            label="Đếm Ngược Đến Giờ Khai Màn SOLFERA – D-DAY 2026"
          />
        </div>

        {/* Heroic Call-to-Action (Links to /register) */}
        <div className="glass-card gala-cta-banner reveal">
          <div className="gala-cta-inner">
            <span className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
              Vé Mời Giới Hạn
            </span>
            <h3 className="direction-title font-display" style={{ marginBottom: '2rem' }}>
              Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao &amp; POHE
            </h3>
            <Link
              to="/register"
              className="btn btn-primary btn-cta gala-banner-cta-btn"
            >
              <Ticket size={20} />
              <span>Đăng Ký Tham Dự Ngay</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalaSection;
