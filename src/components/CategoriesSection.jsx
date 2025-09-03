import React from 'react';
import { Link } from 'react-router-dom';

// Data kategori (bisa diganti dari API nanti)
const categories = [
  { name: 'Web Development', icon: '💻', query: 'Web Development' },
  { name: 'Desain Grafis', icon: '🎨', query: 'Design' },
  { name: 'Pemasaran Digital', icon: '📈', query: 'Digital Marketing' },
  { name: 'Data Science', icon: '📊', query: 'Data' },
];

const CategoriesSection = () => {
  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">
            Kategori Populer
          </h2>
          <p className="mt-2 text-lg text-text-muted">
            Jelajahi berbagai bidang yang kami tawarkan.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/?q=${category.query}`}
              className="block p-6 bg-white border border-border rounded-lg text-center hover:shadow-lg hover:border-primary transition-all duration-300"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-text-primary">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
