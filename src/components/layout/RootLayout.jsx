// src/components/layout/RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { ScrollToAnchor } from '../common/ScrollToAnchor';

/**
 * Shared Application Layout
 * Provides persistent Navbar, Footer, Accessible Skip Link, and dynamic Main Content (<Outlet />)
 */
export const RootLayout = () => {
  return (
    <div className="app-layout">
      {/* Scroll restoration & cross-route anchor scroll manager */}
      <ScrollToAnchor />

      {/* Accessible Skip Navigation Link */}
      <a href="#main-content" className="skip-link">
        Chuyển đến nội dung chính
      </a>

      {/* Persistent Top Navigation Bar */}
      <Navbar />

      {/* Main Dynamic Content Area */}
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>

      {/* Persistent Page Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;

