import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useAuthStore from '/src/store/authStore.js';

const AdminSidebar = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkClass = 'bg-primary text-white';
  const defaultLinkClass = 'text-text-primary hover:bg-gray-100';
  const basePath = user?.role === 'admin' ? '/admin' : '/instructor';

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ✅ Dengarkan event dari Navbar
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggleSidebar', handler);
    return () => window.removeEventListener('toggleSidebar', handler);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white p-4 rounded-lg shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:sticky md:top-24 md:translate-x-0 transition-transform duration-300 z-40`}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <div>
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <p className="text-sm text-text-muted capitalize">{user?.role}</p>
          </div>
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-semibold ${
                  isActive ? activeLinkClass : defaultLinkClass
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              🏠 Dashboard
            </NavLink>
          )}

          {user?.role === 'admin' && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-semibold ${
                  isActive ? activeLinkClass : defaultLinkClass
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              👥 Pengguna
            </NavLink>
          )}

          <NavLink
            to={`${basePath}/courses`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-semibold ${
                isActive ? activeLinkClass : defaultLinkClass
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            📚 Kursus
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/admin/enrollments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-semibold ${
                  isActive ? activeLinkClass : defaultLinkClass
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              🎓 Pendaftaran
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Overlay untuk menutup sidebar saat diklik di luar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AdminSidebar;
