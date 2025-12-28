'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import en from '@/src/data/navbar/en.json';
import id from '@/src/data/navbar/id.json';
import { useLanguage } from '@/src/context/languageContext';
import Image from 'next/image';
import renderDesktopMenu from './NavbarType/DesktopMenu';
import renderMobileMenu from './NavbarType/MobileMenu';

export default function Header() {
  const { language } = useLanguage();
  const navbarData = language === "id" ? id : en;
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const dropdownRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!navbarData) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm shadow-gray-200/80 dark:shadow-black/40 sticky top-0 z-50">
        <div className="h-16 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Loading navigation...
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm shadow-gray-200/70 dark:shadow-black/40 sticky top-0 z-50">
      {/* DESKTOP */}
      <div className="hidden md:flex h-16 items-center justify-between max-w-7xl mx-auto px-6">
        <Image
          src="/logo-bahana.png"
          alt="Bahana Isuzu Cianjur"
          width={120}
          height={32}
          className="h-7 w-auto"
          priority
        />

        {renderDesktopMenu(navbarData, dropdownRef, pathname, activeDropdown, setActiveDropdown)}

        <Image
          src="/logorpri.jpg"
          alt="RPRI"
          width={60}
          height={32}
          className="h-7 w-auto rounded-md border border-gray-200 dark:border-gray-700"
          priority
        />
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-between h-14 px-4 relative">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-6 h-6 text-slate-800 dark:text-slate-100" />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo-bahana.png"
            alt="Dealer"
            width={100}
            height={32}
            className="w-auto"
            priority
          />
        </div>

        <Image
          src="/logorpri.jpg"
          alt="RPRI"
          width={50}
          height={28}
          className="ml-auto rounded-md border border-gray-200 dark:border-gray-700"
          priority
        />

        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
            onClick={() => setOpen(false)}
          />
        )}

        {renderMobileMenu(navbarData, pathname,language, openMobileSubmenu, setOpenMobileSubmenu, setOpen, open)}
      </div>
    </header>
  );
}