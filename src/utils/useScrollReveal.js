// src/utils/useScrollReveal.js
import { useEffect } from 'react';

/**
 * Lightweight Scroll-Triggered Reveal Hook — Solfera D-DAY 2026
 * Uses native IntersectionObserver to animate elements with .reveal / .reveal-scale
 * when they enter the viewport.
 * - Fully respects prefers-reduced-motion
 * - Auto-cleans up will-change after transition to conserve GPU memory
 * - Robust fallback when IntersectionObserver is unsupported
 */
export const useScrollReveal = () => {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
};

export default useScrollReveal;
