// src/pages/HomePage.jsx
import React from 'react';
import { VideoHero } from '../components/home/VideoHero';
import { AboutSection } from '../components/home/AboutSection';
import { GalaSection } from '../components/home/GalaSection';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * HomePage (Landing Page)
 * Final Composition:
 * 1. VideoHero (#hero)
 * 2. AboutSection (#about)
 * 3. GalaSection (#gala)
 * (Footer is rendered via shared RootLayout)
 */
export const HomePage = () => {
  // Activate lightweight scroll-triggered reveal animations
  useScrollReveal();

  return (
    <div className="homepage-content">
      {/* 1. Full-screen Video Hero */}
      <VideoHero />

      {/* 2. Club Introduction & Activities */}
      <AboutSection />

      {/* 3. GALA NIGHT Celebration Overview */}
      <GalaSection />
    </div>
  );
};

export default HomePage;
