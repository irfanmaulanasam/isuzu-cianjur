import LanguageToggle from "../../LanguageToggle";
import Link from "next/link";
import { X, Search, ChevronDown, ChevronUp } from 'lucide-react'

export default function renderMobileMenu(navbarData, pathname, language, openMobileSubmenu, setOpenMobileSubmenu, setOpen, open){
    if (!navbarData?.navbar?.menu) return null;

    return (
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          bg-white dark:bg-red-900 backdrop-blur-md shadow-2xl border-r border-gray-200 dark:border-gray-800
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === 'id' ? 'Navigasi' : 'Navigation'}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/95">
          <LanguageToggle />
        </div>

        <Link
          href="/search"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 p-3 border-b border-gray-200 bg-white dark:bg-gray-900/95   dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <Search className="w-5 h-5" />
          <span>Cari</span>
        </Link>

        <nav className="flex flex-col p-2 space-y-1 bg-white dark:bg-gray-900/95 dark:text-white">
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
                      ? 'bg-bahana-primary text-white dark:bg-bahana-light dark:text-gray-100 dark:hover:bg-gray-800'
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