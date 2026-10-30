// src/components/home/AboutSection.jsx
import React from 'react';
import {
  Target,
  Heart,
  Zap,
  HeartHandshake,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';

/**
 * AboutSection — Solfera D-DAY 2026 | GYC - Câu lạc bộ Thế hệ trẻ AEP
 * Features:
 * - 1. Verified Achievement & Milestones Strip (stats-grid with luxury champagne typography)
 * - 2. Section Header: About Us, Slogan & Official Description
 * - 3. Core Values: 4 Cultural Pillars (Tôn trọng, Chủ động, Trách nhiệm, Đồng hành)
 * - 4. Strategic Bridging CTA Banner guiding visitors to #gala
 */
export const AboutSection = () => {
  const getPillarIcon = (id) => {
    switch (id) {
      case 'respect':
        return <Heart size={24} className="text-gold" />;
      case 'proactive':
        return <Zap size={24} className="text-gold" />;
      case 'responsibility':
        return <Target size={24} className="text-gold" />;
      case 'companionship':
        return <HeartHandshake size={24} className="text-gold" />;
      default:
        return <Sparkles size={24} className="text-gold" />;
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
    <section id="about" className="section about-section" aria-label="Giới thiệu GYC - Câu lạc bộ Thế hệ trẻ AEP">
      <div className="container">
        {/* 1. Verified Achievements & Milestones Strip (Customer PDF Page 4 & 5) */}
        <div className="stats-grid reveal" style={{ marginBottom: '4.5rem' }}>
          {CLUB_INFO.stats.map((stat, idx) => (
            <div key={idx} className={`glass-card stat-card reveal-delay-${idx + 1}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 2. Section Header: About Us (Customer PDF Page 5) */}
        <div className="section-header reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Sparkles size={14} className="text-gold" />
            <span>About us</span>
          </span>
          <h2 className="section-title">
            GYC - Câu lạc bộ <span className="text-gradient font-display">Thế hệ trẻ AEP</span>
          </h2>
          <p className="about-slogan font-display">
            “Light up your way!”
          </p>
          <p className="section-desc">
            {CLUB_INFO.description}
          </p>
        </div>

        {/* 3. Core Values Grid (Customer PDF Page 6) */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div className="section-header reveal" style={{ marginBottom: '2.75rem' }}>
            <span className="section-tag">
              <Sparkles size={14} className="text-gold" />
              <span>{CLUB_INFO.coreValuesTitle}</span>
            </span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', color: '#ffffff' }}>
              Những giá trị cốt lõi <span className="text-gradient">GYC - Câu lạc bộ Thế hệ trẻ AEP</span> hướng tới
            </h3>
          </div>

          <div className="grid-2 pillar-grid">
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

        {/* 4. Strategic Bridging CTA Banner Guiding Visitors to #gala */}
        <div className="glass-card gala-direction-card reveal">
          <div className="gala-direction-content">
            <span className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
              Sự Kiện Trọng Tâm 2026
            </span>
            <h3 className="direction-title font-display">
              Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao &amp; POHE
            </h3>
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
