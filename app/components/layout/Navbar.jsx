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
  const [navbarData, setNavbarData] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Update navbar data when language changes
  useEffect(() => {
    const data = language === 'id' ? id : en;
    console.log('Selected language:', language);
    console.log('Navbar data structure:', data);
    console.log('Navbar menu:', data?.navbar?.menu);
    setNavbarData(data);
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Safe render function dengan null check
  const renderDesktopMenu = () => {
    if (!navbarData?.navbar?.menu) {
      return <div className="text-gray-500">Loading menu...</div>; // Fallback selama loading
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
                    ? 'font-semibold text-bahana-primary'
                    : 'text-gray-700 hover:text-bahana-dark transition'
                }
                onClick={() => setActiveDropdown(null)}
              >
                {m.title}
              </Link>
            );
          }

          return (
            <div
              key={m.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(index)}
            >
              <button
                className={`flex items-center gap-1 p-2 rounded-md ${activeDropdown === index || isActive
                    ? 'font-semibold text-bahana-primary'
                    : 'text-gray-700 hover:text-bahana-dark transition'
                  }`}
              >
                {m.title}
                {activeDropdown === index ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {activeDropdown === index && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50">
                  {m.submenu.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={`block px-4 py-2 text-sm hover:bg-bahana-light ${pathname === sub.path
                          ? 'font-semibold text-bahana-primary'
                          : 'text-gray-700'
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

        {/* Language Toggle untuk Desktop */}
        <LanguageToggle />

        {/* 🔍 Search icon → Langsung Redirect */}
        <Link href="/search" className="p-2 rounded-md hover:bg-gray-100">
          <Search className="w-5 h-5 text-gray-700" />
        </Link>
      </div>
    );
  };

  // ✅ Safe render mobile menu
  const renderMobileMenu = () => {
    if (!navbarData?.navbar?.menu) {
      return null; // Jangan render mobile menu jika data belum ready
    }

    return (
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Navigasi</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Toggle untuk Mobile */}
        <div className="p-4 border-b">
          <LanguageToggle />
        </div>

        {/* 🔍 Search shortcut di mobile */}
        <Link
          href="/search"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 p-3 border-b hover:bg-gray-100"
        >
          <Search className="w-5 h-5 text-gray-700" />
          <span>Cari</span>
        </Link>

        <nav className="flex flex-col p-2 space-y-1">
          {navbarData.navbar.menu.map((m, index) => {
            const hasSubmenu = m.submenu && m.submenu.length > 0;
            const isOpen = openMobileSubmenu === index;

            if (!hasSubmenu) {
              return (
                <Link
                  key={m.path}
                  href={m.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md ${pathname === m.path
                      ? 'bg-bahana-primary text-white'
                      : 'text-slate-900 hover:bg-bahana-light'
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
                  className={`flex justify-between items-center w-full px-3 py-2 rounded-md ${isOpen ? 'bg-bahana-light' : 'text-slate-700 hover:bg-gray-100'
                    }`}
                >
                  {m.title}
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <div className="flex flex-col pl-4 mt-1 border-l-2 border-bahana-primary">
                    {m.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className={`px-3 py-1 text-sm ${pathname === sub.path
                            ? 'text-bahana-primary underline font-semibold'
                            : 'text-slate-600 hover:text-bahana-primary hover:underline'
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    );
  };

  // ✅ Tampilkan loading state jika data belum siap
  if (!navbarData) {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="h-16 flex items-center justify-center">
          <div className="text-gray-500">Loading navigation...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
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
          className="h-7 w-auto"
          priority
        />
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-between h-14 px-4 relative">
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-slate-700" />
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
          className="ml-auto"
          priority
        />

        {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

        {renderMobileMenu()}
      </div>
    </header>
  );
}