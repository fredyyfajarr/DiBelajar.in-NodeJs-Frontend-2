// src/pages/AllCoursesPage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCourses } from '/src/hooks/useCourses.js';
import { useCategories } from '/src/hooks/useCategories.js'; // <-- Import hook
import { useSearchParams } from 'react-router-dom';
import CourseCard from '/src/components/CourseCard.jsx';
import Pagination from '/src/components/Pagination.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllCoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useCategories(); // <-- Gunakan hook

  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const coursesPerPage = 8;

  const { data: response, isLoading } = useCourses({
    page,
    limit: coursesPerPage,
    category: category, // Kirim ID kategori ke API
  });

  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (page > 1) params.page = page;
    setSearchParams(params, { replace: true });
  }, [category, page, setSearchParams]);

  const handleCategoryChange = (newCategoryId) => {
    setCategory(newCategoryId);
    setPage(1);
  };

  const courses = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / coursesPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderContent = () => {
    if (isLoading && courses.length === 0) {
      return (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array(coursesPerPage)
            .fill()
            .map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Skeleton height={250} className="rounded-2xl" />
              </motion.div>
            ))}
        </motion.div>
      );
    }
    if (courses.length === 0) {
      return (
        <p className="text-center py-12 text-gray-600 col-span-full">
          Tidak ada kursus yang ditemukan.
        </p>
      );
    }
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <motion.div key={course._id} variants={cardVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center font-sans mb-4 leading-tight">
          Jelajahi Semua Kursus Kami
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              category === ''
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat._id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                category === cat._id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {renderContent()}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
