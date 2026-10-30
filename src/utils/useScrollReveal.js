// src/utils/useScrollReveal.js
import { useLayoutEffect } from 'react';

/**
 * Lightweight Scroll-Triggered Reveal Hook — Solfera D-DAY 2026
 * Uses native IntersectionObserver to animate elements with .reveal / .reveal-scale
 * when they enter the viewport.
 * - Fully respects prefers-reduced-motion
 * - Leaves content visible unless the observer is ready
 * - Falls back to visible content when motion is reduced or unsupported
 */
export const useScrollReveal = () => {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    const elements = document.querySelectorAll('.reveal, .reveal-scale');
    let observer;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      elements.forEach((el) => observer.observe(el));
      root.classList.add('motion-ready');
    } catch {
      observer?.disconnect();
      root.classList.remove('motion-ready');
      return;
    }

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);
};

export default useScrollReveal;
