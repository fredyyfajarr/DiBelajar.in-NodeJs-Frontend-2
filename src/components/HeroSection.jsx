/* eslint-disable no-unused-vars */
// src/components/HeroSection.jsx

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const title = 'Belajar Skill Baru, Buka Peluang Baru';
  const words = title.split(' ');

  // Varian animasi untuk container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda antar animasi anak-anaknya
      },
    },
  };

  // Varian animasi untuk setiap kata
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Container animasi untuk judul */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animasi sederhana untuk deskripsi */}
        <motion.p
          className="text-lg text-text-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.1, duration: 0.5 }} // Muncul setelah judul selesai
        >
          Akses ribuan kursus gratis dari para ahli di bidangnya dan tingkatkan
          karir Anda ke level selanjutnya.
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
