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
        <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
        <p className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent font-medium">Memuat...</p>
      </motion.div>
    </div>
  );

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Enhanced Animated Polka Dots Pattern */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        {/* Large Dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute w-5 h-5 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Medium Dots */}
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={`medium-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-br from-pink-600/40 to-purple-600/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Small Dots */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1.5 h-1.5 bg-gradient-to-br from-purple-700/30 to-pink-700/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
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

      {/* Enhanced Aesthetic Curved Lines and Waves */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="line2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.5"/>
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#D946EF" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="line3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="line4" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#D946EF" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          
          {/* Primary Wave Lines */}
          <motion.path
            d="M0,400 Q300,200 600,350 T1200,300"
            stroke="url(#line1)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,600 Q400,400 800,550 T1200,500"
            stroke="url(#line2)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M0,200 Q200,50 500,150 T1000,100"
            stroke="url(#line1)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Additional Wave Lines */}
          <motion.path
            d="M0,300 Q150,150 400,250 Q650,350 900,200 T1200,250"
            stroke="url(#line3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.path
            d="M0,500 Q250,300 500,450 Q750,600 1000,400 T1200,450"
            stroke="url(#line4)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, ease: "easeInOut", delay: 2 }}
          />
          <motion.path
            d="M0,100 Q400,300 800,150 T1200,200"
            stroke="url(#line2)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4.5, ease: "easeInOut", delay: 0.8 }}
          />
          
          {/* Sine Wave Patterns */}
          <motion.path
            d="M0,350 Q100,250 200,350 T400,350 Q500,250 600,350 T800,350 Q900,250 1000,350 T1200,350"
            stroke="url(#line1)"
            strokeWidth="1.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, ease: "easeInOut", delay: 2.5 }}
          />
          <motion.path
            d="M0,650 Q120,550 240,650 T480,650 Q600,550 720,650 T960,650 Q1080,550 1200,650"
            stroke="url(#line3)"
            strokeWidth="2.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 9, ease: "easeInOut", delay: 3 }}
          />
        </svg>
      </div>

      {/* Enhanced Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #9333EA 1.5px, transparent 1.5px),
            radial-gradient(circle at 75% 75%, #EC4899 1.5px, transparent 1.5px),
            radial-gradient(circle at 50% 50%, #A855F7 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 40px 40px',
          backgroundPosition: '0 0, 30px 30px, 15px 15px'
        }}
      />

      {/* Enhanced Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Triangle */}
        <motion.div
          className="absolute top-20 right-20 w-0 h-0 border-l-[35px] border-r-[35px] border-b-[60px] border-l-transparent border-r-transparent border-b-purple-500/40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Diamond */}
        <motion.div
          className="absolute bottom-32 left-16 w-10 h-10 bg-gradient-to-br from-pink-600/40 to-purple-600/40 transform rotate-45"
          animate={{ 
            scale: [1, 1.3, 1],
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
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500/45 to-pink-500/45" 
               style={{ 
                 clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
               }} 
          />
        </motion.div>

        {/* Circle */}
        <motion.div
          className="absolute top-2/3 right-32 w-12 h-12 border-3 border-purple-500/50 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            borderColor: ['rgba(147, 51, 234, 0.5)', 'rgba(236, 72, 153, 0.5)', 'rgba(147, 51, 234, 0.5)']
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Additional Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-6 h-6 bg-gradient-to-br from-pink-500/35 to-purple-500/35 rounded-full"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/3"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <div className="w-4 h-8 bg-gradient-to-t from-purple-600/40 to-pink-600/40 rounded-full transform rotate-12" />
        </motion.div>
      </div>

      {/* Enhanced Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-white/50 to-purple-300/30 backdrop-blur-sm border border-pink-300/40 shadow-lg"
            style={{
              width: `${25 + Math.random() * 50}px`,
              height: `${25 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [-30, -900],
              x: [0, Math.random() * 120 - 60],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-br from-pink-600/60 to-purple-600/60 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 20, 0],
              opacity: [0.3, 0.8, 0.4, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
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