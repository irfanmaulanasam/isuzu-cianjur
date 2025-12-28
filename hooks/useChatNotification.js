'use client';
import { useEffect, useRef } from 'react';

export function useChatNotifications({ unreadCount }) {
  const originalTitle = useRef('');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // simpan title awal sekali
    if (!originalTitle.current) {
      originalTitle.current = document.title;
    }

    // kalau tab aktif → jangan ubah title
    if (document.visibilityState === 'visible') {
      document.title = originalTitle.current;
      return;
    }

    // kalau ada pesan belum dibaca dan tab tidak aktif → ubah title
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Pesan baru | ${originalTitle.current}`;
    } else {
      document.title = originalTitle.current;
    }
  }, [unreadCount]);
}