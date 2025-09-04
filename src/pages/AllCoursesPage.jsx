/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCourses } from '/src/hooks/useCourses.js';
import CourseCard from '/src/components/CourseCard.jsx';
import Pagination from '/src/components/Pagination.jsx';

const AllCoursesPage = () => {
  const [page, setPage] = useState(1);
  const coursesPerPage = 10; // Tentukan berapa banyak kursus per halaman

  const { data: response, isLoading } = useCourses({
    page,
    limit: coursesPerPage,
  });

  const courses = response?.data || [];
  const totalPages = Math.ceil((response?.total || 0) / coursesPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const renderContent = () => {
    if (isLoading && courses.length === 0) {
      return (
        <p className="text-center py-12 text-gray-600 col-span-full">
          Memuat kursus...
        </p>
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <motion.div
            key={course._id}
            variants={cardVariants}
            whileHover="hover"
            className="w-full"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center font-sans mb-12 leading-tight">
          Jelajahi Semua Kursus Kami
        </h1>
        {renderContent()}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              className="flex gap-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
