// src/components/sections/AboutSection.jsx
import React from 'react';
import { Target, Heart, Award, Users } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';

export const AboutSection = () => {
  return (
    <section id="about" style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Stats Grid */}
        <div className="stats-grid">
          {CLUB_INFO.stats.map((stat, idx) => (
            <div key={idx} className="glass-card stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About Info Header */}
        <div className="section-header">
          <span className="section-tag">Về Chúng Tôi</span>
          <h2 className="section-title">Ngôi Nhà Chung Cho Những Đam Mê Sáng Tạo</h2>
          <p className="section-desc">
            Không chỉ là một câu lạc bộ học thuật, {CLUB_INFO.name} là nơi bạn tìm thấy những người đồng đội cùng chí hướng, cùng nhau học hỏi, cùng nhau tạo nên những dấu ấn đáng nhớ trong thời sinh viên.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Thực Chiến & Ứng Dụng</h3>
            <p style={{ fontSize: '0.92rem' }}>
              Trải nghiệm các dự án thực tế ngay từ những ngày đầu. Không lý thuyết suông, bạn được trực tiếp bắt tay vào xây dựng sản phẩm và điều hành sự kiện.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Gắn Kết & Sẻ Chia</h3>
            <p style={{ fontSize: '0.92rem' }}>
              Văn hóa cởi mở, tôn trọng cá tính và luôn hỗ trợ lẫn nhau. Những buổi teambuilding, dã ngoại và tâm sự đêm muộn sẽ trở thành những kỷ niệm không thể quên.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Phát Triển Toàn Diện</h3>
            <p style={{ fontSize: '0.92rem' }}>
              Rèn luyện song hành cả kỹ năng chuyên môn sâu và các kỹ năng mềm quan trọng: tư duy phản biện, giải quyết vấn đề, giao tiếp và quản trị thời gian.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Mạng Lưới Kết Nối Rộng Lớn</h3>
            <p style={{ fontSize: '0.92rem' }}>
              Kết nối với mạng lưới cựu thành viên thành đạt tại các doanh nghiệp hàng đầu và các câu lạc bộ đối tác trên toàn quốc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
