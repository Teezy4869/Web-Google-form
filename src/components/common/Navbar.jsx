// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, Sparkles, Send } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';

export const Navbar = ({ onApplyClick }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container navbar-container">
        <a href="#hero" className="nav-brand">
          <Sparkles className="text-primary" size={24} />
          <span>{CLUB_INFO.name}</span>
          <span className="brand-badge">2026</span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
          <li>
            <a
              href="#about"
              className="nav-link"
              onClick={() => setIsMobileOpen(false)}
            >
              Về CLB
            </a>
          </li>
          <li>
            <a
              href="#timeline"
              className="nav-link"
              onClick={() => setIsMobileOpen(false)}
            >
              Lộ Trình
            </a>
          </li>
          <li>
            <a
              href="#departments"
              className="nav-link"
              onClick={() => setIsMobileOpen(false)}
            >
              Các Ban
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="nav-link"
              onClick={() => setIsMobileOpen(false)}
            >
              Hỏi Đáp
            </a>
          </li>
          <li>
            <button
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}
              onClick={() => {
                setIsMobileOpen(false);
                if (onApplyClick) onApplyClick();
              }}
            >
              <Send size={15} />
              <span>Ứng Tuyển Ngay</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
