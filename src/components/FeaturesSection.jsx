// src/components/FeaturesSection.jsx
import React from 'react';

// Data untuk setiap kartu fitur
const features = [
  {
    icon: '🎓',
    title: 'Instruktur Ahli',
    description:
      'Belajar dari para praktisi terbaik di industrinya masing-masing.',
  },
  {
    icon: '💻',
    title: 'Pembelajaran Fleksibel',
    description:
      'Akses materi kapan saja dan di mana saja sesuai kecepatan Anda.',
  },
  {
    icon: '📄',
    title: 'Gratis Selamanya',
    description:
      'Semua kursus di platform kami 100% gratis tanpa biaya tersembunyi.',
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">
            Mengapa Memilih DiBelajar.in?
          </h2>
          <p className="mt-2 text-lg text-text-muted">
            Platform terbaik untuk meningkatkan skill Anda.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 border border-border rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="mt-1 text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
