import React from 'react';
import useModalStore from '/src/store/modalStore';

const CTASection = () => {
  const { openModal } = useModalStore();

  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">
          Siap untuk Mulai Belajar?
        </h2>
        <p className="mt-2 text-lg text-indigo-200 max-w-2xl mx-auto">
          Buat akun gratis Anda sekarang dan dapatkan akses ke semua kursus kami
          selamanya.
        </p>
        <div className="mt-8">
          <button
            onClick={() => openModal('REGISTER')}
            className="bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Daftar Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
