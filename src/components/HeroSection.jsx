// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
          Belajar Skill Baru, Buka Peluang Baru
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Akses ribuan kursus gratis dari para ahli di bidangnya dan tingkatkan
          karir Anda ke level selanjutnya.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
