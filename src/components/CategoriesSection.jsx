/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Web Development', icon: '💻', query: 'Web Development' },
  { name: 'Desain Grafis', icon: '🎨', query: 'Design' },
  { name: 'Pemasaran Digital', icon: '📈', query: 'Digital Marketing' },
  { name: 'Data Science', icon: '📊', query: 'Data' },
];

const CategoriesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              }}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 text-center"
            >
              <Link to={`/?q=${category.query}`}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesSection;
