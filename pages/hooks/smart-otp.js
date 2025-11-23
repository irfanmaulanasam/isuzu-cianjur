import { useState, useEffect } from 'react';

export const useSmartOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Cek status saat pertama kali load
  useEffect(() => {
    const checkVerification = () => {
      const storedData = localStorage.getItem('isuzu_user_verified');
      if (storedData) {
        const { timestamp, phone } = JSON.parse(storedData);
        const threeMonths = 90 * 24 * 60 * 60 * 1000; // 90 hari dalam milidetik
        const now = new Date().getTime();

        // Jika belum 3 bulan, anggap verified
        if (now - timestamp < threeMonths) {
          setIsVerified(true);
          return phone; // Kembalikan nomor HP yg tersimpan
        }
      }
      return null;
    };
    checkVerification();
  }, []);

  // Panggil fungsi ini saat user sukses input OTP
  const markAsVerified = (phoneNumber) => {
    const data = {
      phone: phoneNumber,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('isuzu_user_verified', JSON.stringify(data));
    setIsVerified(true);
    setShowOtpModal(false);
  };

  return { isVerified, showOtpModal, setShowOtpModal, markAsVerified };
};