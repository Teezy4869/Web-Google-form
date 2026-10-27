// src/App.jsx
import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { DepartmentsSection } from './components/sections/DepartmentsSection';
import { ApplicationForm } from './components/sections/ApplicationForm';
import { FAQSection } from './components/sections/FAQSection';
import { Footer } from './components/common/Footer';
import { SuccessModal } from './components/common/SuccessModal';

export const App = () => {
  const [preselectedDept, setPreselectedDept] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const scrollToApplication = () => {
    const el = document.getElementById('application');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDepartment = (deptName) => {
    setPreselectedDept(deptName);
    scrollToApplication();
  };

  const handleFormSuccess = (responseData) => {
    setSuccessData(responseData);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Skip to Main Content (Accessibility) */}
      <a href="#application" className="skip-link">
        Chuyển đến biểu mẫu đăng ký
      </a>

      {/* Navigation */}
      <Navbar onApplyClick={scrollToApplication} />

      {/* Hero Section with Countdown */}
      <HeroSection onApplyClick={scrollToApplication} />

      {/* About & Stats Section */}
      <AboutSection />

      {/* Recruitment Timeline */}
      <TimelineSection />

      {/* Departments Overview */}
      <DepartmentsSection onSelectDepartment={handleSelectDepartment} />

      {/* Application Form (Multi-step) */}
      <ApplicationForm
        preselectedDept={preselectedDept}
        onSuccess={handleFormSuccess}
      />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        data={successData}
        onClose={() => setIsSuccessModalOpen(false)}
        onReset={() => {
          setSuccessData(null);
          setPreselectedDept('');
          scrollToApplication();
        }}
      />
    </div>
  );
};

export default App;
