import LanguageToggle from "../../LanguageToggle";
import Link from "next/link";
import { X, Search, ChevronDown, ChevronUp } from 'lucide-react'

export default function renderMobileMenu(navbarData, pathname, language, openMobileSubmenu, setOpenMobileSubmenu, setOpen, open){
  if (!navbarData?.navbar?.menu) return null;
  return (
    <>
      {/* Overlay Blur */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpen(false)}
      />
      
      {/* Navbar Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-r border-gray-200 dark:border-gray-800
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {language === 'id' ? 'Navigasi' : 'Navigation'}
          </h2>
          <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Language Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <LanguageToggle />
        </div>

        {/* Search */}
        <Link
          href="/search"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span>{language === 'id' ? 'Cari' : 'Search'}</span>
        </Link>

        {/* Menu Items */}
        {/* <nav className="flex-1 overflow-y-auto p-2 space-y-1"> */}
        <nav className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {navbarData.navbar.menu.map((m, index) => {
            const hasSubmenu = m.submenu && m.submenu.length > 0;
            const isOpen = openMobileSubmenu === index;
            
            // ✅ LOGIKA ACTIVE STATE YANG BENAR
            const isActive = hasSubmenu 
              ? pathname.startsWith(m.path)  // Parent menu aktif jika ada submenu child aktif
              : pathname === m.path;         // Menu biasa: exact match

            if (!hasSubmenu) {
              return (
                <Link
                  key={m.path}
                  href={m.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-bahana-primary dark:text-bahana-light underline underline-offset-4 decoration-2'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                  className={`flex justify-between items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isOpen || isActive
                      ? 'text-bahana-primary dark:text-bahana-light bg-gray-50 dark:bg-gray-800/50 underline underline-offset-4 decoration-2'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{m.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="pl-6 mt-2 space-y-1 border-l-2 border-bahana-primary/50 dark:border-bahana-light/50">
                    {m.submenu.map((sub) => {
                      const subActive = pathname === sub.path; // Submenu: exact match
                      return (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`block px-3 py-2 text-sm rounded transition-colors ${
                            subActive
                              ? 'text-bahana-primary dark:text-bahana-light font-semibold underline underline-offset-2 decoration-2'
                              : 'text-gray-600 dark:text-gray-400 hover:text-bahana-primary dark:hover:text-bahana-light hover:underline'
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
    </>
  );
}