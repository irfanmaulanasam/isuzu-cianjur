// hooks/useSmartOTP.js
import { useState, useEffect } from 'react';

export const useSmartOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      const storedData = localStorage.getItem('isuzu_user_verified');
      if (storedData) {
        try {
          const { timestamp, phone } = JSON.parse(storedData);
          // Tentukan periode 3 bulan
          const threeMonths = 90 * 24 * 60 * 60 * 1000;
          const now = new Date().getTime();
          if (now - timestamp < threeMonths) {
            setIsVerified(true);
          }
        } catch (error) {
          console.error('Error parsing verification data:', error);
        }
      }
    };
    
    checkVerification();
  }, []);

  const markAsVerified = (phoneNumber) => {
    const data = {
      phone: phoneNumber,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('isuzu_user_verified', JSON.stringify(data));
    setIsVerified(true);
    setShowOtpModal(false);
  };

  return {
    isVerified,
    showOtpModal,
    setShowOtpModal,
    markAsVerified
  };
};