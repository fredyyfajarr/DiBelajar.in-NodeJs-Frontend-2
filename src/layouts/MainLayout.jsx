import React, { Suspense, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
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
      <p>Memuat...</p>
    </div>
  );

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Navbar kirim toggleSidebar */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className="flex-grow relative z-10">
        {isPanelPage ? (
          <div className="container mx-auto flex flex-col md:flex-row gap-4 py-8 px-4 sm:px-6">
            {/* Sidebar terima prop isOpen */}
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
          <Suspense fallback={pageLoadingFallback}>
            <Outlet />
          </Suspense>
        )}
      </main>

      <Footer />

      {/* Modal auth */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalView === 'LOGIN' && <LoginPage />}
        {modalView === 'REGISTER' && <RegisterPage />}
        {modalView === 'FORGOT_PASSWORD' && <ForgotPasswordPage />}
      </Modal>

      {/* Overlay sidebar di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleSidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;
