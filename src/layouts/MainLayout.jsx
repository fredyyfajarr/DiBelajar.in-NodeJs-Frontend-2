import React, { Suspense, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import Modal from '/src/components/Modal.jsx';
import useModalStore from '/src/store/modalStore.js';
import LoginPage from '/src/pages/LoginPage.jsx';
import RegisterPage from '/src/pages/RegisterPage.jsx';
import ForgotPasswordPage from '/src/pages/ForgotPasswordPage.jsx';
import AdminSidebar from '/src/components/admin/AdminSidebar.jsx';

const MainLayout = () => {
  const { isModalOpen, modalView, closeModal } = useModalStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isPanelPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  const pageLoadingFallback = (
    <div className="flex justify-center items-center h-full p-10">
      <motion.div
        className="flex items-center space-x-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Memuat...</p>
      </motion.div>
    </div>
  );

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-purple-50 via-pink-50 to-white overflow-hidden">
      {/* Animated Polka Dots Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Large Dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Medium Dots */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`medium-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Small Dots */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Aesthetic Curved Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="line2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,400 Q300,200 600,350 T1200,300"
            stroke="url(#line1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,600 Q400,400 800,550 T1200,500"
            stroke="url(#line2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M0,200 Q200,50 500,150 T1000,100"
            stroke="url(#line1)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #8B5CF6 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #EC4899 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 80px 80px',
          backgroundPosition: '0 0, 25px 25px'
        }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Triangle */}
        <motion.div
          className="absolute top-20 right-20 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-purple-300/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Diamond */}
        <motion.div
          className="absolute bottom-32 left-16 w-8 h-8 bg-gradient-to-br from-pink-400/20 to-purple-400/20 transform rotate-45"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [45, 225, 45] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Hexagon */}
        <motion.div
          className="absolute top-1/3 left-10"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-6 h-6 bg-gradient-to-br from-purple-300/25 to-pink-300/25" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
               }} 
          />
        </motion.div>

        {/* Circle */}
        <motion.div
          className="absolute top-2/3 right-32 w-10 h-10 border-2 border-purple-300/30 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            borderColor: ['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(139, 92, 246, 0.3)']
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-white/40 to-purple-200/20 backdrop-blur-sm border border-white/30"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [-20, -800],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      <main className="flex-grow relative z-20">
        {isPanelPage ? (
          <div className="container mx-auto flex flex-col md:flex-row gap-4 py-8 px-4 sm:px-6">
            {/* Sidebar */}
            <AdminSidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className="w-full md:ml-4">
              <Suspense fallback={pageLoadingFallback}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="w-full px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
            <Suspense fallback={pageLoadingFallback}>
              <Outlet />
            </Suspense>
          </div>
        )}
      </main>

      <div className="relative z-20">
        <Footer />
      </div>

      {/* Modal auth */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalView === 'LOGIN' && <LoginPage />}
        {modalView === 'REGISTER' && <RegisterPage />}
        {modalView === 'FORGOT_PASSWORD' && <ForgotPasswordPage />}
      </Modal>

      {/* Overlay sidebar di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleSidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;