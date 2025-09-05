/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import useModalStore from '/src/store/modalStore';
import useAuthStore from '/src/store/authStore.js';

const HeroSection = () => {
  const { openModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();
  const title = 'Belajar Skill Baru, Buka Peluang Baru';
  const words = title.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.6 } },
  };

  return (
    <div
      className="bg-gradient-to-r from-blue-50 to-white min-h-[60vh] flex items-center"
      style={{
        backgroundImage: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-sans"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Akses ribuan kursus gratis dari para ahli dan tingkatkan karir Anda
          dengan fleksibilitas penuh.
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          {isAuthenticated ? (
            <a
              href="#popular-courses"
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
            >
              Jelajahi Kursus Populer
            </a>
          ) : (
            <button
              onClick={() => openModal('REGISTER')}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
            >
              Mulai Belajar Sekarang
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
