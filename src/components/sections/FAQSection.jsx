// src/components/sections/FAQSection.jsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/recruitmentData';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Giải Đáp Thắc Mắc</span>
          <h2 className="section-title">Câu Hỏi Thường Gặp (FAQ)</h2>
          <p className="section-desc">
            Những thông tin cần biết để bạn chuẩn bị tốt nhất cho đơn ứng tuyển của mình.
          </p>
        </div>

        <div className="faq-grid">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card faq-card"
                onClick={() => toggle(idx)}
              >
                <div className="faq-question">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={20} className="text-primary" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: 'var(--text-dim)'
                    }}
                  />
                </div>

                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
