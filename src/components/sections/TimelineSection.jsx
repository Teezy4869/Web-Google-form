// src/components/sections/TimelineSection.jsx
import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { RECRUITMENT_TIMELINE } from '../../data/recruitmentData';

export const TimelineSection = () => {
  return (
    <section id="timeline" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Lộ Trình Tuyển Dụng</span>
          <h2 className="section-title">Hành Trình Chinh Phục Mùa Tuyển 2026</h2>
          <p className="section-desc">
            Cùng điểm qua 3 chặng đường chính để chính thức trở thành mảnh ghép của CLB.
          </p>
        </div>

        <div className="timeline-list">
          {RECRUITMENT_TIMELINE.map((item) => (
            <div key={item.step} className="glass-card timeline-item">
              <div className="timeline-step">{item.step}</div>
              <div className="timeline-content">
                <div className="timeline-time">
                  <Calendar size={15} />
                  <span>{item.time}</span>
                  {item.status === 'active' && (
                    <span className="badge badge-emerald" style={{ marginLeft: '0.5rem', padding: '0.2rem 0.6rem' }}>
                      Đang Mở Đơn
                    </span>
                  )}
                </div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: '0.94rem' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
