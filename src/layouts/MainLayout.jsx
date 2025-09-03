import React, { Suspense } from 'react'; // Import Suspense
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

  const isPanelPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  // UI Fallback untuk ditampilkan saat halaman sedang diunduh
  const pageLoadingFallback = (
    <div className="flex justify-center items-center h-full p-10">
      <p>Memuat...</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        {isPanelPage ? (
          <div className="container mx-auto flex gap-8 py-8 px-4 sm:px-6">
            <AdminSidebar />
            <div className="w-full">
              {/* Bungkus Outlet dengan Suspense */}
              <Suspense fallback={pageLoadingFallback}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        ) : (
          /* Bungkus Outlet dengan Suspense */
          <Suspense fallback={pageLoadingFallback}>
            <Outlet />
          </Suspense>
        )}
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalView === 'LOGIN' && <LoginPage />}
        {modalView === 'REGISTER' && <RegisterPage />}
        {modalView === 'FORGOT_PASSWORD' && <ForgotPasswordPage />}
      </Modal>
    </div>
  );
};

export default MainLayout;
