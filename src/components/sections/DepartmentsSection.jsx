// src/components/sections/DepartmentsSection.jsx
import React from 'react';
import { Code, Video, CalendarDays, Megaphone, Check, ArrowRight } from 'lucide-react';
import { DEPARTMENTS } from '../../data/recruitmentData';

export const DepartmentsSection = ({ onSelectDepartment }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'tech':
        return <Code size={26} />;
      case 'media':
        return <Video size={26} />;
      case 'events':
        return <CalendarDays size={26} />;
      case 'er':
        return <Megaphone size={26} />;
      default:
        return <Code size={26} />;
    }
  };

  return (
    <section id="departments" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Các Ban Chuyên Môn</span>
          <h2 className="section-title">Chọn Vùng Đất Để Bạn Tỏa Sáng</h2>
          <p className="section-desc">
            Mỗi ban chuyên môn là một môi trường riêng biệt để bạn phát huy thế mạnh sở trường và khai phá những tiềm năng mới.
          </p>
        </div>

        <div className="dept-grid">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="glass-card dept-card">
              <div className="dept-header">
                <div className="dept-icon">{getIcon(dept.id)}</div>
                <div>
                  <h3>{dept.name}</h3>
                  <span className="dept-role">{dept.role}</span>
                </div>
              </div>

              <p className="dept-desc">{dept.shortDesc}</p>

              <div className="dept-list-title">Kỹ năng cần có / rèn luyện:</div>
              <ul className="dept-skills">
                {dept.skills.map((skill, idx) => (
                  <li key={idx}>
                    <Check size={16} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.9rem' }}
                  onClick={() => onSelectDepartment(dept.name)}
                >
                  <span>Chọn Ứng Tuyển Ban Này</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
