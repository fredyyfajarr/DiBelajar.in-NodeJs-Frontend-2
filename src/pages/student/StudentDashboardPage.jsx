/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useAuthStore from '/src/store/authStore.js';
import { useMyEnrollments, useMyReview } from '/src/hooks/useStudent.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewModal from '/src/components/ReviewModal.jsx';

const CourseItem = ({ enrollment, handleOpenReviewModal }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  const courseSlug = enrollment.courseId.slug || enrollment.courseId._id;
  const { data: reviewResponse, isLoading: isReviewLoading } =
    useMyReview(courseSlug);
  const myReview = reviewResponse?.data;
  // console.log('myReview dari useMyReview:', myReview); // Tambahkan log in

  const hasReviewed = !!myReview;
  const buttonText = hasReviewed ? 'Edit Ulasan' : 'Beri Ulasan';
  const modalMode = hasReviewed ? 'edit' : 'add';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col justify-between"
    >
      <Link to={`/learn/${courseSlug}`} className="block">
        <div className="flex items-center gap-4">
          <img
            src={enrollment.courseId.thumbnail}
            alt={enrollment.courseId.title}
            className="w-32 h-20 object-cover rounded-xl"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 font-sans">
              {enrollment.courseId.title}
            </h3>
            <p className="text-sm text-primary mt-1 flex items-center gap-1 font-semibold">
              Lanjutkan Belajar <span>&rarr;</span>
            </p>
          </div>
        </div>
      </Link>

      {enrollment.completedAt && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() =>
              handleOpenReviewModal(courseSlug, modalMode, myReview)
            }
            disabled={isReviewLoading}
            className="w-full text-center bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isReviewLoading ? 'Memuat...' : buttonText}
          </button>
        </div>
      )}
    </motion.div>
  );
};

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const { data: response, isLoading } = useMyEnrollments(user._id);
  const enrollments = response?.data?.data || [];

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    courseSlug: null,
    currentReview: null,
  });

  const handleOpenReviewModal = (slug, mode, review) => {
    // console.log('Data review yang dikirim:', review); // Tambahkan log ini
    setModalState({
      isOpen: true,
      mode,
      courseSlug: slug,
      currentReview: review,
    });
  };

  const handleCloseReviewModal = () => {
    setModalState({
      isOpen: false,
      mode: 'add',
      courseSlug: null,
      currentReview: null,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  return (
    <>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans mb-2">
          Selamat Datang, {user.name}!
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Ini adalah daftar kursus yang sedang kamu ikuti. Teruslah belajar!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <p className="text-gray-600 text-center col-span-full">
              Memuat kursus Anda...
            </p>
          )}
          {!isLoading && enrollments.length === 0 && (
            <motion.div
              className="col-span-full text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600">
                Anda belum terdaftar di kursus manapun.
              </p>
              <Link
                to="/"
                className="text-primary font-semibold hover:underline mt-2 inline-block"
              >
                Cari Kursus Sekarang
              </Link>
            </motion.div>
          )}
          {!isLoading &&
            enrollments.map((enroll) => (
              <CourseItem
                key={enroll._id}
                enrollment={enroll}
                handleOpenReviewModal={handleOpenReviewModal}
              />
            ))}
        </div>
      </motion.div>
      <ReviewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseReviewModal}
        courseSlug={modalState.courseSlug}
        mode={modalState.mode}
        currentReview={modalState.currentReview}
      />
    </>
  );
};

export default StudentDashboardPage;
