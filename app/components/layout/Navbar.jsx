'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import en from '@/src/data/navbar/en.json';
import id from '@/src/data/navbar/id.json';
import LanguageToggle from '../LanguageToggle';
import { useLanguage } from '@/src/context/languageContext';
import Image from 'next/image';

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

  const renderDesktopMenu = () => {
    if (!navbarData?.navbar?.menu) {
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Loading menu...
        </div>
      );
    }
    return (
      <div className="flex items-center gap-6" ref={dropdownRef}>
        {navbarData.navbar.menu.map((m, index) => {
          const hasSubmenu = m.submenu && m.submenu.length > 0;
          const isActive = pathname.startsWith(m.path);

          if (!hasSubmenu) {
            return (
              <Link
                key={m.path}
                href={m.path}
                className={
                  isActive
                    ? 'font-semibold text-bahana-primary dark:text-bahana-light'
                    : 'text-gray-700 hover:text-bahana-dark dark:text-gray-200 dark:hover:text-white transition-colors'
                }
                onClick={() => setActiveDropdown(null)}
              >
                {m.title}
              </Link>
            );
          }

          // ⬇️ index dipakai DI DALAM callback map
          return (
            <div
              key={m.title}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === index ? null : index)
                }
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                  activeDropdown === index || isActive
                    ? 'font-semibold text-bahana-primary dark:text-bahana-light bg-bahana-light/20 dark:bg-bahana-light/10'
                    : 'text-gray-700 hover:text-bahana-dark dark:text-gray-200 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {m.title}
                {activeDropdown === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                )}
              </button>

              {activeDropdown === index && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm z-50">
                  {m.submenu.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === sub.path
                          ? 'font-semibold text-bahana-primary dark:text-bahana-light bg-bahana-light/20 dark:bg-bahana-light/10'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <LanguageToggle />

        <Link
          href="/search"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </Link>
      </div>
    );
  };

  const renderMobileMenu = () => {
    if (!navbarData?.navbar?.menu) return null;

    return (
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-r border-gray-200 dark:border-gray-800
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {language === 'id' ? 'Navigasi' : 'Navigation'}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <LanguageToggle />
        </div>

        <Link
          href="/search"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <Search className="w-5 h-5" />
          <span>Cari</span>
        </Link>

        <nav className="flex flex-col p-2 space-y-1">
          {navbarData.navbar.menu.map((m, index) => {
            const hasSubmenu = m.submenu && m.submenu.length > 0;
            const isOpen = openMobileSubmenu === index;
            const isActive = pathname.startsWith(m.path);

            if (!hasSubmenu) {
              return (
                <Link
                  key={m.path}
                  href={m.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-bahana-primary text-white dark:bg-bahana-light dark:text-gray-900'
                      : 'text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {m.title}
                </Link>
              );
            }

            return (
              <div key={m.title}>
                <button
                  type="button"
                  onClick={() => setOpenMobileSubmenu(isOpen ? null : index)}
                  className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isOpen || isActive
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                      : 'text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {m.title}
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  )}
                </button>

                {isOpen && (
                  <div className="flex flex-col pl-4 mt-1 border-l-2 border-bahana-primary dark:border-bahana-light">
                    {m.submenu.map((sub) => {
                      const subActive = pathname === sub.path;
                      return (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`px-3 py-1.5 text-sm transition-colors ${
                            subActive
                              ? 'text-bahana-primary dark:text-bahana-light font-semibold underline'
                              : 'text-gray-700 hover:text-bahana-primary dark:text-gray-300 dark:hover:text-bahana-light hover:underline'
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    );
  };

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

        {renderDesktopMenu()}

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

        {renderMobileMenu()}
      </div>
    </header>
  );
}