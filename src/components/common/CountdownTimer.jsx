// src/components/common/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { CLUB_INFO } from '../../data/recruitmentData';

export const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const target = new Date(CLUB_INFO.deadline).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="countdown-box" aria-label="Recruitment deadline countdown">
      <div className="countdown-label">
        <Clock size={16} />
        <span>
          {timeLeft.isExpired
            ? 'Đợt Tuyển Quân Đã Khép Lại'
            : 'Thời Gian Nhận Đơn Còn Lại'}
        </span>
      </div>

      {timeLeft.isExpired ? (
        <p className="countdown-expired">Hạn nhận đơn: 25/10/2026. Theo dõi fanpage CLB để cập nhật đợt tuyển tiếp theo.</p>
      ) : <div className="countdown-grid">
        <div className="countdown-unit">
          <div className="countdown-number">{formatNumber(timeLeft.days)}</div>
          <div className="countdown-name">Ngày</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{formatNumber(timeLeft.hours)}</div>
          <div className="countdown-name">Giờ</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{formatNumber(timeLeft.minutes)}</div>
          <div className="countdown-name">Phút</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{formatNumber(timeLeft.seconds)}</div>
          <div className="countdown-name">Giây</div>
        </div>
      </div>}
    </div>
  );
};
