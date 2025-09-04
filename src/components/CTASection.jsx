/* eslint-disable no-unused-vars */
import React from 'react';
import useModalStore from '/src/store/modalStore';
import { motion } from 'framer-motion';

const CTASection = () => {
  const { openModal } = useModalStore();

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
    animate: {
      scale: [1, 1.02, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'mirror' },
    },
  };

  return (
    <div className="bg-purple-900">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap untuk Mulai Belajar?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Buat akun gratis sekarang dan akses semua kursus kami selamanya.
        </p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          animate="animate"
          onClick={() => openModal('REGISTER')}
          className="bg-white text-primary font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300"
        >
          Daftar Gratis
        </motion.button>
      </div>
    </div>
  );
};

export default CTASection;
