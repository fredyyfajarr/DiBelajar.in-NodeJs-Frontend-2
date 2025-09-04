import React from 'react';
import useAuthStore from '/src/store/authStore.js';
import { useMyEnrollments } from '/src/hooks/useStudent.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseItem = ({ enrollment }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <Link
        to={`/learn/${enrollment.courseId.slug || enrollment.courseId._id}`}
        className="block"
      >
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 border border-gray-100">
          <img
            src={enrollment.courseId.thumbnail}
            alt={enrollment.courseId.title}
            className="w-32 h-20 object-cover rounded-xl"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 font-sans">
              {enrollment.courseId.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              Lanjutkan Belajar <span>&rarr;</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const { data: response, isLoading } = useMyEnrollments(user._id);
  const enrollments = response?.data?.data || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  return (
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
            <CourseItem key={enroll._id} enrollment={enroll} />
          ))}
      </div>
    </motion.div>
  );
};

export default StudentDashboardPage;
