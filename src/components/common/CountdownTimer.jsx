// src/components/common/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = ({
  targetDate,
  label = 'Thời Gian Còn Lại Đến Sự Kiện',
  expiredLabel = 'Sự Kiện Đang Diễn Ra',
  expiredMessage = 'Thời gian đếm ngược đã kết thúc. Theo dõi Fanpage để cập nhật những khoảnh khắc mới nhất!'
}) => {
  const calculateTimeLeft = () => {
    if (!targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isConfigured: false };
    }

    const target = new Date(targetDate).getTime();
    if (isNaN(target)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, isConfigured: false };
    }

    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isConfigured: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
      isConfigured: true
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  if (!timeLeft.isConfigured) {
    return (
      <div className="countdown-box" aria-label="Event countdown">
        <div className="countdown-label">
          <Clock size={16} />
          <span>{label}</span>
        </div>
        <p className="countdown-expired">
          Thời gian chính thức sẽ sớm được Ban Tổ Chức công bố trên các kênh truyền thông.
        </p>
      </div>
    );
  }

  return (
    <div className="countdown-box" aria-label="Event countdown">
      <div className="countdown-label">
        <Clock size={16} />
        <span>{timeLeft.isExpired ? expiredLabel : label}</span>
      </div>

      {timeLeft.isExpired ? (
        <p className="countdown-expired">{expiredMessage}</p>
      ) : (
        <div className="countdown-grid">
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
        </div>
      )}
    </div>
  );
};

