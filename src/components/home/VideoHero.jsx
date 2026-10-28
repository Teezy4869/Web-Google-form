// src/components/home/VideoHero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Ticket, Compass, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { GALA_EVENT } from '../../data/galaData';

/**
 * Modern Cinematic Hero Section — Solfera D-DAY 2026
 * Features:
 * - High-impact typography hierarchy with 'Cinzel' display font
 * - Atmospheric dark wine obsidian lighting & subtle ambient gradients
 * - Integrated official Key Visual showcase card with luxury champagne rim
 * - Multi-action CTA buttons (Primary ticket reservation & Secondary smooth scroll exploration)
 * - Zero Layout Shift (CLS = 0) with explicit aspect ratios
 * - Fully responsive across mobile, tablet, and desktop
 */
export const VideoHero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGala = () => {
    const galaSection = document.getElementById('gala');
    if (galaSection) {
      galaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Giới thiệu đại sự kiện Solfera – D-DAY 2026"
    >
      {/* Layer 1: Ambient Background Visual & Atmospheric Vignette */}
      <div className="hero-backdrop" aria-hidden="true">
        <img
          src="/assets/images/solfera-hero-visual.webp"
          alt=""
          className="hero-backdrop-image"
          loading="eager"
          fetchPriority="high"
          width="2048"
          height="1151"
        />
        <div className="hero-backdrop-vignette" />
        <div className="hero-backdrop-bottom-fade" />
        <div className="fallback-glow-orb orb-rose" />
        <div className="fallback-glow-orb orb-ruby" />
        <div className="fallback-glow-orb orb-champagne" />
        <div className="fallback-grid-texture" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Event Typography & CTAs */}
          <div className="hero-content">
            {/* Kicker Badge */}
            <div className="hero-kicker-wrapper hero-animate-kicker">
              <span className="section-tag hero-kicker">
                <Sparkles size={14} className="text-gold" />
                <span>NHẬN DIỆN CHÍNH THỨC · YGC / AEP</span>
              </span>
            </div>

            {/* Main Title Hierarchy */}
            <h1 className="hero-title hero-animate-title">
              <span className="hero-title-brand font-display text-gradient">
                SOLFERA
              </span>
              <span className="hero-title-sub">
                D-DAY 2026
              </span>
            </h1>

            {/* Event Tagline & Summary */}
            <p className="hero-tagline hero-animate-tagline">
              {GALA_EVENT.tagline}
            </p>

            <p className="hero-description hero-animate-desc">
              {GALA_EVENT.description}
            </p>

            {/* Event Key Features Strip */}
            <div className="hero-pills-strip hero-animate-pills">
              <div className="hero-info-pill">
                <Calendar size={15} className="text-gold" />
                <span>{GALA_EVENT.schedule.dateTime || 'Đang cập nhật'}</span>
              </div>
              <div className="hero-info-pill">
                <MapPin size={15} className="text-gold" />
                <span>{GALA_EVENT.venue.address}</span>
              </div>
              <div className="hero-info-pill">
                <ShieldCheck size={15} className="text-gold" />
                <span>Vé tham dự miễn phí</span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="hero-actions hero-animate-actions">
              <Link
                to="/register"
                className="btn btn-primary btn-cta hero-btn-main"
              >
                <Ticket size={18} />
                <span>Đăng Ký Tham Dự Ngay</span>
              </Link>

              <button
                type="button"
                className="btn btn-secondary hero-btn-secondary"
                onClick={scrollToGala}
              >
                <Compass size={18} />
                <span>Khám Phá D-DAY 2026</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Artwork Card */}
          <div className="hero-visual-showcase hero-animate-visual">
            <div className="hero-showcase-frame glass-card hero-showcase-float">
              <div className="hero-showcase-badge">
                <span className="brand-badge">KEY VISUAL 2026</span>
              </div>
              <div className="hero-showcase-media">
                <img
                  src="/assets/images/solfera-hero-visual.webp"
                  alt="Solfera – D-DAY 2026 Visual Chính Thức"
                  className="hero-showcase-img"
                  width="1200"
                  height="674"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="hero-showcase-overlay" />
              </div>
              <div className="hero-showcase-footer">
                <div className="showcase-footer-item">
                  <span className="showcase-label">Đơn Vị Tổ Chức</span>
                  <span className="showcase-value">{CLUB_INFO.name}</span>
                </div>
                <div className="showcase-footer-divider" />
                <div className="showcase-footer-item">
                  <span className="showcase-label">Chủ Đề</span>
                  <span className="showcase-value text-gold">{GALA_EVENT.theme}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        className="video-hero-scroll-indicator hero-scroll-indicator"
        onClick={scrollToAbout}
        aria-label="Cuộn xuống khám phá thêm thông tin"
      >
        <span className="scroll-mouse">
          <span className="scroll-wheel" />
        </span>
        <span className="scroll-text">Khám Phá</span>
      </button>
    </section>
  );
};

export default VideoHero;
