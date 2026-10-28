// src/components/common/ScrollToAnchor.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles smooth scrolling to anchor targets across route changes,
 * accounting for sticky navbar height and dynamic page rendering.
 */
export const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      // Slight delay ensures the target DOM element is rendered after route transitions
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Optional focus for accessibility
          element.setAttribute('tabindex', '-1');
          element.focus({ preventScroll: true });
        }
      }, 60);

      return () => clearTimeout(timer);
    } else {
      // When navigating between pages without an anchor, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

