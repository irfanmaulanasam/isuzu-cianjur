import Link from "next/link";
import LanguageToggle from "../../LanguageToggle";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
export default function renderDesktopMenu (navbarData, dropdownRef, pathname, activeDropdown, setActiveDropdown) {
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