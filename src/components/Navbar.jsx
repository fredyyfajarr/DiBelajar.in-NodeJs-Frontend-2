import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // <-- Tambahkan useLocation
import useModalStore from '/src/store/modalStore.js';
import useAuthStore from '/src/store/authStore.js';
import { ThemeContext } from '/src/context/ThemeContext.jsx';
import { getDashboardPath } from '../utils/getDashboardPath';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // <-- Dapatkan lokasi URL saat ini
  const { toggleTheme } = useContext(ThemeContext);
  const { openModal } = useModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    if (window.confirm('Are you sure want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  const dashboardPath = getDashboardPath(user);
  const isAdminPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <Link to="/" className="font-bold text-2xl text-primary">
            DiBelajar.in
          </Link>
        </div>

        {!isAdminPage && (
          <div className="hidden md:block flex-grow max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-text-muted"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari kursus apa saja..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {isAdminPage && (
          <div className="hidden md:block flex-grow max-w-xl"></div>
        )}

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200"
            title="Ganti Tema"
          >
            🎨
          </button>
          {isAuthenticated ? (
            <>
              <span className="hidden lg:block text-sm text-text-muted">
                Halo, {user?.name}!
              </span>
              <Link
                to={dashboardPath}
                className="hidden sm:block px-4 py-2 text-sm font-semibold text-text-primary rounded-md hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal('LOGIN')}
                className="hidden sm:block px-4 py-2 text-sm font-semibold text-text-primary rounded-md hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => openModal('REGISTER')}
                className="bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
