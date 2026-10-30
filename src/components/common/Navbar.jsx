// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket } from 'lucide-react';
import { GALA_EVENT } from '../../data/galaData';

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Scroll detection for sticky navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape key or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen]);

  const handleNavClick = (anchorId) => {
    setIsMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setIsMobileOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // On non-home routes (e.g., /register), default to scrolled background for consistent contrast
  const isScrolledAppearance = isScrolled || location.pathname !== '/';

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolledAppearance ? 'navbar-scrolled' : ''}`}
      role="navigation"
      aria-label="Điều hướng chính"
    >
      <div className="container navbar-container">
        {/* Brand Logo & Solfera Identity */}
        <Link to="/" className="nav-brand" onClick={handleLogoClick} aria-label="Solfera D-Day 2026 Trang Chủ">
          <img
            src="/assets/images/solfera-logo.webp"
            alt="Solfera Logo"
            className="nav-brand-logo"
            width="38"
            height="38"
            loading="eager"
          />
          <div className="nav-brand-text-group">
            <span className="nav-brand-title font-display">SOLFERA</span>
            <span className="brand-badge">D-DAY 2026</span>
          </div>
          <span className="brand-org-tag" title="Tổ chức bởi GYC - AEP">
            GYC - AEP
          </span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
          aria-expanded={isMobileOpen}
          aria-controls="navbar-nav-links"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navigation Links - Order matches page reading hierarchy */}
        <ul
          id="navbar-nav-links"
          className={`nav-links ${isMobileOpen ? 'open' : ''}`}
        >
          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
              onClick={handleLogoClick}
            >
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link
              to="/#gala"
              className="nav-link"
              onClick={() => handleNavClick('gala')}
            >
              Sự Kiện D-DAY 2026
            </Link>
          </li>
          <li>
            <Link
              to="/#about"
              className="nav-link"
              onClick={() => handleNavClick('about')}
            >
              Về GYC - AEP
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="btn btn-primary nav-cta-btn"
              onClick={() => setIsMobileOpen(false)}
            >
              <Ticket size={16} />
              <span>Đăng Ký Tham Dự</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
