import React from 'react';
import { useLocation, Outlet } from 'react-router-dom'; // <-- Import Outlet & useLocation
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

  // Cek apakah URL saat ini adalah halaman admin atau instruktur
  const isPanelPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Konten Utama yang Dinamis */}
      <main className="flex-grow">
        {isPanelPage ? (
          // Jika ini halaman admin/instruktur, gunakan layout 2 kolom
          <div className="container mx-auto flex gap-8 py-8 px-4 sm:px-6">
            <AdminSidebar />
            <div className="w-full">
              <Outlet />{' '}
              {/* <-- Halaman (misal: UserManagementPage) akan dirender di sini */}
            </div>
          </div>
        ) : (
          // Jika bukan, tampilkan konten halaman secara normal
          <Outlet />
        )}
      </main>

      <Footer />

      {/* Modal untuk Login, Register, dll. */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalView === 'LOGIN' && <LoginPage />}
        {modalView === 'REGISTER' && <RegisterPage />}
        {modalView === 'FORGOT_PASSWORD' && <ForgotPasswordPage />}
      </Modal>
    </div>
  );
};

export default MainLayout;
