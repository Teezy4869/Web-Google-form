// src/components/home/GalaSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  MapPin,
  Ticket,
  Clock,
  Award,
  Music,
  Users2,
  Camera,
  ArrowRight,
  Flame,
  HeartHandshake,
  Rocket
} from 'lucide-react';
import { GALA_EVENT } from '../../data/galaData';
import { CLUB_INFO } from '../../data/clubData';
import { CountdownTimer } from '../common/CountdownTimer';

/**
 * SOLFERA – D-DAY 2026 Event Section
 * Features:
 * - Event Theme & Storytelling Meaning (Khơi Nguồn Đam Mê & 3 Core Values)
 * - Official Key Visual Masterpiece Showcase Frame (Strict 16:9 aspect ratio, no crop/distortion)
 * - Schedule & Venue Information (falls back cleanly to "Đang cập nhật")
 * - 4 Key Highlights of the Celebration
 * - Countdown Timer
 * - Primary Registration CTA linking directly to /register via React Router
 */
export const GalaSection = () => {
  const getHighlightIcon = (id) => {
    switch (id) {
      case 'honoring':
        return <Award size={22} className="text-primary" />;
      case 'performance':
        return <Music size={22} className="text-primary" />;
      case 'networking':
        return <Users2 size={22} className="text-primary" />;
      case 'exhibition':
        return <Camera size={22} className="text-primary" />;
      default:
        return <Sparkles size={22} className="text-primary" />;
    }
  };

  const themeDisplay = GALA_EVENT.theme || 'Đang cập nhật';
  const timeDisplay = GALA_EVENT.schedule.dateTime || 'Đang cập nhật';
  const doorsOpenDisplay = GALA_EVENT.schedule.doorsOpen || 'Đang cập nhật';
  const venueDisplay = GALA_EVENT.venue.name || 'Đang cập nhật';
  const addressDisplay = GALA_EVENT.venue.address || 'Đang cập nhật';

  return (
    <section id="gala" className="section gala-section" aria-label="Sự kiện SOLFERA – D-DAY 2026">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>Đại Sự Kiện Nghệ Thuật & Tri Ân</span>
          </span>
          <h2 className="section-title">{GALA_EVENT.name}</h2>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Chủ đề chính thức: <strong className="text-gradient" style={{ fontSize: '1.15rem' }}>{themeDisplay}</strong>
          </p>
        </div>

        {/* Meaning & Storytelling Card with Official Key Visual Showcase */}
        <div className="glass-card gala-meaning-card reveal" style={{ marginBottom: '4.5rem' }}>
          <div className="gala-meaning-grid">
            {/* Left Column: Storytelling & Meaning Pillars */}
            <div className="gala-meaning-text">
              <div className="meaning-kicker-wrapper">
                <span className="badge badge-primary">
                  <Sparkles size={13} className="text-gold" />
                  <span>Ý Nghĩa Sự Kiện · Linh Hồn Solfera</span>
                </span>
              </div>

              <h3 className="meaning-heading font-display">
                Khơi Nguồn Đam Mê — <span className="text-gradient">Bừng Sáng Tương Lai</span>
              </h3>

              <p className="meaning-lead">
                {GALA_EVENT.meaning}
              </p>

              <p className="meaning-desc">
                {GALA_EVENT.description}
              </p>

              {/* 3 Meaning Core Pillars */}
              <div className="meaning-values-grid">
                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <Flame size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Thắp Lửa Đam Mê</h4>
                    <p className="meaning-value-text">
                      Khơi dậy nguồn cảm hứng sáng tạo và khát vọng dấn thân mãnh liệt của thế hệ trẻ công nghệ & truyền thông.
                    </p>
                  </div>
                </div>

                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <HeartHandshake size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Gắn Kết Thế Hệ</h4>
                    <p className="meaning-value-text">
                      Tri ân những cống hiến của thế hệ tiền bối, thắt chặt tinh thần đoàn kết bền chặt của đại gia đình YGC / AEP.
                    </p>
                  </div>
                </div>

                <div className="meaning-value-item">
                  <div className="meaning-value-icon">
                    <Rocket size={20} className="text-gold" />
                  </div>
                  <div className="meaning-value-content">
                    <h4 className="meaning-value-title">Bứt Phá Giới Hạn</h4>
                    <p className="meaning-value-text">
                      Mở ra chương mới đầy triển vọng, cùng nhau kiến tạo những giá trị tích cực và vươn tới tầm cao mới.
                    </p>
                  </div>
                </div>
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
                    alt="Key Visual chính thức Solfera – D-DAY 2026 | YGC/AEP"
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
                    <span className="visual-footer-title">{GALA_EVENT.name}</span>
                  </div>
                  <div className="visual-footer-tag">
                    <span>{CLUB_INFO.name}</span>
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
                  <span>Mở cửa đón khách: {doorsOpenDisplay}</span>
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

        {/* 4 Main Event Highlights */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">Điểm Nhấn Sự Kiện</span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#ffffff' }}>4 Dấu Ấn Đáng Chờ Đợi Nhất</h3>
          </div>

          <div className="grid-2">
            {GALA_EVENT.highlights.map((item, idx) => (
              <div
                key={item.id}
                className={`glass-card glass-card-interactive highlight-card reveal reveal-delay-${(idx % 4) + 1}`}
              >
                <div className="highlight-header">
                  <div className="highlight-icon-box">
                    {getHighlightIcon(item.id)}
                  </div>
                  <span className="highlight-number">{item.number}</span>
                </div>
                <h4 className="highlight-title">{item.title}</h4>
                <p className="highlight-desc">{item.description}</p>
              </div>
            ))}
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
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', color: '#ffffff', marginBottom: '0.85rem', letterSpacing: '-0.03em' }}>
              Bạn Đã Sẵn Sàng Hòa Mình Cùng SOLFERA – D-DAY 2026?
            </h3>
            <p style={{ maxWidth: '620px', margin: '0 auto 2rem', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Đừng bỏ lỡ đại sự kiện nghệ thuật và tri ân giàu cảm xúc nhất của YGC / AEP. Đăng ký thông tin ngay hôm nay để nhận vé mời điện tử và giữ chỗ ngồi đẹp nhất.
            </p>
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
