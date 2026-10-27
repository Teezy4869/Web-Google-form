// src/components/sections/HeroSection.jsx
import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';
import { CountdownTimer } from '../common/CountdownTimer';

export const HeroSection = ({ onApplyClick }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-pill">
          <span className="badge badge-primary">
            <Sparkles size={14} />
            <span>{CLUB_INFO.season} · Truyền thông × Công nghệ</span>
          </span>
        </div>

        <h1 className="hero-title">
          Nơi ý tưởng trẻ <br />
          <span className="text-gradient">tạo nên dấu ấn.</span>
        </h1>

        <p className="hero-subtitle">
          Cùng TTV khám phá truyền thông, sáng tạo và công nghệ qua những dự án thật. Tìm ban phù hợp với bạn và bắt đầu hành trình của mình.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem' }}
            onClick={onApplyClick}
          >
            <span>Nộp Đơn Ứng Tuyển Ngay</span>
            <ArrowRight size={18} />
          </button>

          <a href="#about" className="btn btn-secondary">
            <span>Tìm Hiểu Về CLB</span>
          </a>
        </div>

        <CountdownTimer />
      </div>
    </section>
  );
};
