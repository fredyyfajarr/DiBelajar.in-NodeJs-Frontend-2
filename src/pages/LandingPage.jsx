/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useCourses, useSearchCourses } from '/src/hooks/useCourses.js';
import CourseCard from '/src/components/CourseCard.jsx';
import HeroSection from '/src/components/HeroSection.jsx';
import FeaturesSection from '/src/components/FeaturesSection.jsx';
import CategoriesSection from '../components/CategoriesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // Hook untuk semua kursus, hanya aktif jika TIDAK ada query pencarian
  const { data: allCourses, isLoading: isLoadingAll } = useCourses(!query);

  // Hook untuk kursus hasil pencarian, hanya aktif JIKA ADA query pencarian
  const { data: searchedCourses, isLoading: isLoadingSearch } =
    useSearchCourses(query);

  // Tentukan data mana yang akan ditampilkan dan status loadingnya
  const isLoading = query ? isLoadingSearch : isLoadingAll;
  const courses = query ? searchedCourses : allCourses;

  const renderTitle = () => {
    if (query) {
      return (
        <h2 className="text-3xl font-bold mb-8">
          Hasil pencarian untuk: <span className="text-primary">"{query}"</span>
        </h2>
      );
    }
    return (
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Berbagai Pilihan Kursus untuk Anda
      </h2>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-text-muted">Loading courses...</p>;
    }
    if (courses?.length === 0) {
      return (
        <p className="text-center text-text-muted">
          Tidak ada hasil yang ditemukan.
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
        {courses?.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </motion.div>
    );
  };

  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {renderTitle()}
        {renderContent()}
      </div>
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default LandingPage;
