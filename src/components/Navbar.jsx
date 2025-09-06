import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useModalStore from '/src/store/modalStore.js';
import useAuthStore from '/src/store/authStore.js';
import { ThemeContext } from '/src/context/ThemeContext.jsx';
import { getDashboardPath } from '../utils/getDashboardPath';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useContext(ThemeContext);
  const { openModal } = useModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Yakin mau logout?')) {
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const event = new CustomEvent('toggleSidebar');
    window.dispatchEvent(event);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle untuk Admin */}
          {isAdminPage && (
            <button
              className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </button>
          )}

          {/* Logo */}
          <Link to="/" className="block">
            <img
              src="/purple_navbar_logo.svg"
              alt="DiBelajar.in"
              className="h-11 hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Search Box */}
        {!isAdminPage && (
          <div className="flex-grow max-w-xl hidden md:block">
            {!isAuthenticated && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 
                      1110.89 3.476l4.817 4.817a1 1 0 
                      01-1.414 1.414l-4.816-4.816A6 
                      6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Cari kursus apa saja..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Ganti Tema"
          >
            <Sun className="h-5 w-5 hidden dark:block text-primary" />
            <Moon className="h-5 w-5 block dark:hidden text-primary" />
          </button>

          {/* Hamburger Menu untuk Guest (pindah ke kanan) */}
          {!isAdminPage && !isAuthenticated && (
            <button
              className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </button>
          )}

          {isAuthenticated ? (
            <>
              <span className="hidden lg:block text-sm text-gray-700">
                Halo, {user?.name}!
              </span>
              <Link
                to={dashboardPath}
                className="hidden sm:block px-5 py-2 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2 text-sm font-medium rounded-xl hover:opacity-90 transition"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <div className="md:flex items-center space-x-3 hidden">
              <button
                onClick={() => openModal('LOGIN')}
                className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => openModal('REGISTER')}
                className="bg-primary text-white px-5 py-2 text-sm font-medium rounded-xl hover:opacity-90 transition"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown (tetap style bawaan full-width) */}
      {!isAdminPage && !isAuthenticated && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg p-5 z-50 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 
                    000-8zM2 8a6 6 0 
                    1110.89 3.476l4.817 4.817a1 1 0 
                    01-1.414 1.414l-4.816-4.816A6 
                    6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari kursus apa saja..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                openModal('LOGIN');
                setIsMenuOpen(false);
              }}
              className="flex-1 bg-primary text-white px-4 py-2 text-sm font-medium rounded-xl hover:opacity-90 transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                openModal('REGISTER');
                setIsMenuOpen(false);
              }}
              className="flex-1 bg-primary text-white px-4 py-2 text-sm font-medium rounded-xl hover:opacity-90 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// Hamburger CSS
const styles = `
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 22px;
    height: 18px;
    cursor: pointer;
  }
  .hamburger .bar {
    width: 100%;
    height: 2px;
    background-color: currentColor;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .hamburger.open .bar:nth-child(1) {
    transform: rotate(45deg) translate(4px, 4px);
  }
  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open .bar:nth-child(3) {
    transform: rotate(-45deg) translate(4px, -4px);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Navbar;
