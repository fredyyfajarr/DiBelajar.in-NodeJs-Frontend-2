import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useModalStore from '/src/store/modalStore.js';
import useAuthStore from '/src/store/authStore.js';
import { ThemeContext } from '/src/context/ThemeContext.jsx';
import { getDashboardPath } from '../utils/getDashboardPath';
import { useNotifications, useMarkNotificationAsRead } from '../hooks/useAdmin'; // <-- Import hooks notifikasi
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useContext(ThemeContext);
  const { openModal } = useModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // <-- State baru untuk notifikasi

  const notificationsRef = useRef(null);
  const { data: notificationsData, isLoading: notificationsLoading } =
    useNotifications();
  const unreadCount = notificationsData?.filter((n) => !n.isRead).length;

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

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Close dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsRef]);

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
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Hamburger untuk admin pages */}
          {isAdminPage && (
            <button
              className="md:hidden p-2 text-primary focus:outline-none"
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

          {/* Hamburger untuk guest pada mobile */}
          {!isAdminPage && !isAuthenticated && (
            <button
              className="md:hidden p-2 text-primary focus:outline-none"
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

          <Link to="/" className="block">
            <img
              src="/purple_navbar_logo.svg"
              alt="DiBelajar.in"
              className="h-10"
            />
          </Link>
        </div>

        {/* Pencarian untuk guest (selalu ada pada desktop, mobile masuk menu) */}
        {!isAdminPage && (
          <div className="flex-grow max-w-xl">
            {!isAuthenticated && (
              <div className="md:block hidden">
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
          </div>
        )}

        {/* Spacer untuk admin pages */}
        {isAdminPage && (
          <div className="hidden md:block flex-grow max-w-xl"></div>
        )}

        <div className="flex items-center space-x-2 flex-shrink-0">
          {isAuthenticated && (
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-200 relative"
                aria-label="Notifikasi"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">
                        Notifikasi
                      </h3>
                    </div>
                    {notificationsLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Memuat...
                      </div>
                    ) : (
                      <div className="max-h-60 overflow-y-auto">
                        {notificationsData.length > 0 ? (
                          notificationsData.map((n) => (
                            <NotificationItem
                              key={n._id}
                              notification={n}
                              onClose={toggleNotifications}
                            />
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            Tidak ada notifikasi baru.
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
            <div className="md:flex items-center space-x-2 hidden">
              <button
                onClick={() => openModal('LOGIN')}
                className="px-4 py-2 text-sm font-semibold text-text-primary rounded-md hover:bg-gray-100"
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
          )}
        </div>

        {/* Dropdown Menu untuk guest pada mobile */}
        {!isAdminPage && !isAuthenticated && isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 z-50">
            <form onSubmit={handleSearchSubmit} className="mb-4">
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
                  setIsMenuOpen(false);
                }}
                className="flex-1 bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
              >
                Login
              </button>
              <button
                onClick={() => {
                  openModal('REGISTER');
                  setIsMenuOpen(false);
                }}
                className="flex-1 bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Tambahkan CSS untuk animasi hamburger
const styles = `
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    cursor: pointer;
  }
  .hamburger .bar {
    width: 100%;
    height: 3px;
    background-color: currentColor;
    transition: all 0.3s ease;
  }
  .hamburger.open .bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open .bar:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
`;

// Tambahkan style ke dokumen
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

const NotificationItem = ({ notification, onClose }) => {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification._id);
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

export default Navbar;
