// src/components/CategoriesSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '/src/hooks/useCategories.js'; // <-- Import hook

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useCategories(); // <-- Gunakan hook

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Menampilkan skeleton loading jika data belum siap
  if (isLoading) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kategori Populer
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Memuat kategori...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kategori Populer
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Jelajahi bidang yang sesuai dengan minat Anda.
          </p>
        </div>
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.slice(0, 4).map(
            (
              category // Hanya tampilkan 4 kategori teratas
            ) => (
              <motion.div
                key={category._id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                }}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 text-center"
              >
                <Link to={`/courses?category=${category._id}`}>
                  <div className="text-4xl mb-3">
                    {' '}
                    {/* Anda bisa menambahkan field icon ke model Category nanti */}
                    {category.name === 'Web Development'
                      ? '💻'
                      : category.name === 'Design'
                      ? '🎨'
                      : category.name === 'Digital Marketing'
                      ? '📈'
                      : '📊'}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesSection;
