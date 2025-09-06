import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useModalStore from '/src/store/modalStore.js';
import useAuthStore from '/src/store/authStore.js';
import { ThemeContext } from '/src/context/ThemeContext.jsx';
import { getDashboardPath } from '../utils/getDashboardPath';
import { useNotifications, useMarkNotificationAsRead } from '../hooks/useAdmin';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleTheme } = useContext(ThemeContext);
  const { openModal } = useModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState(''); // <-- State untuk search
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const { data: notificationsData } = useNotifications();
  const unreadCount = notificationsData?.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
      setIsMobileMenuOpen(false);
      navigate('/');
    }
  };

  // --- Fungsi untuk handle submit search ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${searchQuery.trim()}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false); // Tutup menu setelah search
    }
  };

  const dashboardPath = getDashboardPath(user);
  const isAdminPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDesktopProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="block">
            <img
              src="/purple_navbar_logo.svg"
              alt="DiBelajar.in"
              className="h-10"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Ganti Tema"
          >
            🎨
          </button>

          {isAuthenticated ? (
            <>
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <NotificationDropdown
                  isOpen={isNotificationsOpen}
                  data={notificationsData}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>

              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setIsDesktopProfileOpen(!isDesktopProfileOpen)}
                  className="flex items-center space-x-2 text-sm text-text-primary font-semibold p-2 rounded-lg hover:bg-gray-100"
                >
                  <span>Halo, {user?.name}!</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDesktopProfileOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <DesktopProfileDropdown
                  isOpen={isDesktopProfileOpen}
                  onLinkClick={() => setIsDesktopProfileOpen(false)}
                  handleLogout={handleLogout}
                  dashboardPath={dashboardPath}
                />
              </div>

              <button
                className="md:hidden p-2 text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </button>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => openModal('LOGIN')}
                  className="bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
                >
                  Login
                </button>
                <button
                  onClick={() => openModal('REGISTER')}
                  className="bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
                >
                  Register
                </button>
              </div>
              <button
                className="md:hidden p-2 text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 border-t overflow-hidden"
          >
            <div className="p-4">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  {isAdminPage && (
                    <button
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent('toggleSidebar'))
                      }
                      className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Buka/Tutup Sidebar
                    </button>
                  )}
                  <Link
                    to={dashboardPath}
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Edit Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // --- INI BAGIAN YANG DIPERBARUI UNTUK GUEST ---
                <div className="flex flex-col space-y-4">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
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
                    </div>
                  </form>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        openModal('LOGIN');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 bg-primary text-white px-4 py-2 text-base font-semibold rounded-md hover:opacity-90"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        openModal('REGISTER');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 bg-primary text-white px-4 py-2 text-base font-semibold rounded-md hover:opacity-90"
                    >
                      Register
                    </button>
                  </div>
                </div>
                // --- AKHIR BAGIAN YANG DIPERBARUI ---
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Komponen-komponen Helper (TIDAK ADA PERUBAHAN) ---
const HamburgerIcon = ({ isOpen }) => (
  <div className={`space-y-1.5`}>
    <motion.span
      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
      className="block w-6 h-0.5 bg-primary"
    ></motion.span>
    <motion.span
      animate={{ opacity: isOpen ? 0 : 1 }}
      className="block w-6 h-0.5 bg-primary"
    ></motion.span>
    <motion.span
      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
      className="block w-6 h-0.5 bg-primary"
    ></motion.span>
  </div>
);

const NotificationItem = ({ notification, onClose }) => {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!notification.isRead) markAsRead(notification._id);
    onClose();
    navigate(notification.link);
  };
  return (
    <div
      onClick={handleClick}
      className={`p-3 border-b cursor-pointer transition-all ${
        !notification.isRead
          ? 'bg-indigo-50 hover:bg-indigo-100'
          : 'hover:bg-gray-50'
      }`}
    >
      <p className="text-sm text-text-primary">{notification.message}</p>
      <p className="text-xs text-text-muted mt-1">
        {new Date(notification.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

const NotificationDropdown = ({ isOpen, data, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-50"
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Notifikasi</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {data && data.length > 0 ? (
            data.map((n) => (
              <NotificationItem
                key={n._id}
                notification={n}
                onClose={onClose}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Tidak ada notifikasi.
            </div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const DesktopProfileDropdown = ({
  isOpen,
  onLinkClick,
  handleLogout,
  dashboardPath,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
      >
        <Link
          to={dashboardPath}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onLinkClick}
        >
          Dashboard
        </Link>
        <Link
          to="/profile/edit"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onLinkClick}
        >
          Edit Profil
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Navbar;
