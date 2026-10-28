// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

// Route-based code splitting for minimal initial bundle download
const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Lightweight Route Loading Fallback
 * Prevents layout shift and matches dark atmospheric design system
 */
const RouteLoadingFallback = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: 'var(--text-muted)'
    }}
    role="status"
    aria-live="polite"
  >
    <div className="spinner" style={{ width: '32px', height: '32px' }} aria-hidden="true" />
    <span style={{ fontSize: '0.9rem' }}>Đang tải nội dung...</span>
  </div>
);

/**
 * Root Application Router Configuration
 * Maps:
 *   "/"         -> HomePage (Landing Page with #hero, #about, #gala)
 *   "/register" -> RegisterPage (Event Registration Form)
 *   "*"         -> NotFoundPage (404 Fallback)
 * All wrapped inside RootLayout with dynamic Suspense boundaries
 */
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoadingFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
