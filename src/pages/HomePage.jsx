// src/pages/HomePage.jsx
import React from 'react';
import { VideoHero } from '../components/home/VideoHero';
import { GalaSection } from '../components/home/GalaSection';
import { AboutSection } from '../components/home/AboutSection';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * HomePage (Landing Page)
 * Reordered Page Composition (Customer Page 1 Requirement):
 * 1. VideoHero (#hero) - Event identity, introduction, schedule pills, primary CTA
 * 2. GalaSection (#gala) - Event celebration details, meaning, timeline, highlights, countdown
 * 3. AboutSection (#about) - Club identity, milestones, core values
 * (Footer is rendered via shared RootLayout)
 */
export const HomePage = () => {
  // Activate lightweight scroll-triggered reveal animations
  useScrollReveal();

  return (
    <div className="homepage-content">
      {/* 1. Full-screen Video Hero */}
      <VideoHero />

      {/* 2. Official Event Celebration Overview (Prioritized before Club info) */}
      <GalaSection />

      {/* 3. Club Introduction & Core Values */}
      <AboutSection />
    </div>
  );
};

export default HomePage;
