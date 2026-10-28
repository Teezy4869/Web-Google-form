// src/components/home/AboutSection.jsx
import React from 'react';
import {
  Target,
  Heart,
  Award,
  Users,
  Megaphone,
  Code,
  CalendarDays,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { GALA_EVENT } from '../../data/galaData';

/**
 * AboutSection — Solfera D-DAY 2026 | YGC/AEP
 * Features:
 * - 1. Verified Achievement & Milestones Strip (stats-grid with luxury champagne typography)
 * - 2. Section Header: Introduction & Mission of YGC / AEP
 * - 3. Mission Spotlight Card (Deep Wine & Ruby glassmorphism)
 * - 4. Core Values & 4 Cultural Pillars (Interactive cards with subtle hover lift)
 * - 5. Alternating Visual Activities & Storytelling with authentic Solfera concept visuals
 * - 6. Strategic Bridging CTA Banner guiding visitors to #gala
 */
export const AboutSection = () => {
  const getPillarIcon = (id) => {
    switch (id) {
      case 'practical':
        return <Target size={24} className="text-gold" />;
      case 'solidarity':
        return <Heart size={24} className="text-gold" />;
      case 'growth':
        return <Award size={24} className="text-gold" />;
      case 'network':
        return <Users size={24} className="text-gold" />;
      default:
        return <Target size={24} className="text-gold" />;
    }
  };

  const getActivityIcon = (id) => {
    switch (id) {
      case 'media_creative':
        return <Megaphone size={20} className="text-gold" />;
      case 'tech_software':
        return <Code size={20} className="text-gold" />;
      case 'event_staging':
        return <CalendarDays size={20} className="text-gold" />;
      case 'community_bonding':
        return <HeartHandshake size={20} className="text-gold" />;
      default:
        return <Sparkles size={20} className="text-gold" />;
    }
  };

  const getActivityImage = (id) => {
    switch (id) {
      case 'media_creative':
        return {
          src: '/assets/images/solfera-story-art.webp',
          alt: 'Sáng tạo nội dung và ấn phẩm nhận diện số Solfera'
        };
      case 'tech_software':
        return {
          src: '/assets/images/solfera-cover-banner.webp',
          alt: 'Giải pháp công nghệ và hệ thống số hóa sự kiện'
        };
      case 'event_staging':
        return {
          src: '/assets/images/solfera-hero-visual.webp',
          alt: 'Sân khấu đại nhạc hội và vận hành sự kiện chuyên nghiệp'
        };
      case 'community_bonding':
        return {
          src: '/assets/images/solfera-poster.webp',
          alt: 'Văn hóa gắn kết và đời sống cộng đồng YGC / AEP'
        };
      default:
        return {
          src: '/assets/images/solfera-hero-visual.webp',
          alt: 'Hoạt động YGC / AEP'
        };
    }
  };

  const scrollToGala = (e) => {
    e.preventDefault();
    const galaSection = document.getElementById('gala');
    if (galaSection) {
      galaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section about-section" aria-label="Giới thiệu YGC / AEP">
      <div className="container">
        {/* 1. Verified Achievements & Milestones Strip */}
        <div className="stats-grid reveal" style={{ marginBottom: '4.5rem' }}>
          {CLUB_INFO.stats.map((stat, idx) => (
            <div key={idx} className={`glass-card stat-card reveal-delay-${idx + 1}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 2. Section Header: Introduction & Overview */}
        <div className="section-header reveal">
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>Về Chúng Tôi · YGC / AEP</span>
          </span>
          <h2 className="section-title">Hành Trình Kiến Tạo & Bứt Phá Giới Hạn</h2>
          <p className="section-desc">
            {CLUB_INFO.description}
          </p>
        </div>

        {/* 3. Mission Spotlight Card */}
        <div className="glass-card mission-spotlight-card reveal" style={{ marginBottom: '5rem' }}>
          <div className="mission-content">
            <span className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
              Sứ Mệnh Cốt Lõi
            </span>
            <h3 className="mission-title font-display">
              Bệ Phóng Vững Chắc Cho Khát Vọng Tuổi Trẻ
            </h3>
            <p className="mission-text">
              {CLUB_INFO.mission}
            </p>
          </div>
        </div>

        {/* 4. Core Values & 4 Cultural Pillars Grid */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '2.75rem' }}>
            <span className="section-tag">
              Giá Trị Cốt Lõi
            </span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: '#ffffff' }}>
              4 Cột Trụ Văn Hóa & Tinh Thần YGC / AEP
            </h3>
          </div>

          <div className="grid-2">
            {CLUB_INFO.pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`glass-card glass-card-interactive pillar-card reveal reveal-delay-${idx + 1}`}
              >
                <div className="pillar-icon-box">
                  {getPillarIcon(pillar.id)}
                </div>
                <div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Alternating Visual Activities & Storytelling */}
        <div style={{ marginBottom: '6rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag">
              Lĩnh Vực Hoạt Động
            </span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: '#ffffff' }}>
              Những Mảng Hoạt Động Kiến Tạo Dấu Ấn
            </h3>
            <p className="section-desc" style={{ marginTop: '0.5rem' }}>
              Mỗi mảng hoạt động là một không gian trải nghiệm thực chiến chuyên nghiệp để các thành viên khai phóng tiềm năng và tỏa sáng.
            </p>
          </div>

          <div className="activity-list">
            {CLUB_INFO.activities.map((act, index) => {
              const isEven = index % 2 === 1;
              const imgData = getActivityImage(act.id);
              return (
                <div
                  key={act.id}
                  className={`activity-item reveal ${isEven ? 'activity-item-reverse' : ''}`}
                >
                  {/* Left/Right Text Content */}
                  <div className="activity-text">
                    <div className="activity-category-row">
                      {getActivityIcon(act.id)}
                      <span className="badge badge-primary">{act.category}</span>
                    </div>

                    <h4 className="activity-title">{act.title}</h4>
                    <p className="activity-desc">{act.description}</p>

                    <ul className="activity-highlights">
                      {act.highlights.map((item, hIdx) => (
                        <li key={hIdx}>
                          <CheckCircle2 size={16} className="text-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Left/Right Visual Media Frame */}
                  <div className="activity-visual">
                    <div className="media-frame aspect-16-9 visual-frame activity-media-frame">
                      <img
                        src={imgData.src}
                        alt={imgData.alt}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                        className="activity-img"
                      />
                      <div className="activity-overlay">
                        <span className="activity-floating-tag">{act.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Strategic Bridging CTA Banner Guiding Visitors to #gala */}
        <div className="glass-card gala-direction-card reveal">
          <div className="gala-direction-content">
            <span className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
              Sự Kiện Trọng Tâm 2026
            </span>
            <h3 className="direction-title font-display">
              Khám Phá Hành Trình Rực Rỡ Tại <span className="text-gradient">{GALA_EVENT.name}</span>
            </h3>
            <p className="direction-desc">
              Đại sự kiện nghệ thuật tri ân, vinh danh những cá nhân xuất sắc và gắn kết các thế hệ thành viên YGC / AEP đang đón chờ bạn.
            </p>
            <a
              href="#gala"
              onClick={scrollToGala}
              className="btn btn-primary direction-btn"
            >
              <span>Khám Phá Chi Tiết SOLFERA D-DAY</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
