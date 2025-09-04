/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useEnrollInCourse } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';
import useModalStore from '/src/store/modalStore.js';

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Memuat detail kursus...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Gagal memuat kursus. Silakan coba lagi.
      </div>
    );
  }

  const { course, materials } = data;
  const materialsToShow = isAuthenticated ? materials : materials.slice(0, 3);

  const handleEnrollClick = () => {
    enroll(course.slug || course._id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans leading-tight">
            {course.title}
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Oleh {course.instructorId?.name || 'Instruktur Ahli'}
          </p>
          <p
            className="mt-6 text-gray-600 leading-relaxed line-clamp-4"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <hr className="my-8 border-gray-200" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-sans">
            Materi Kursus
          </h2>
          <div className="space-y-4">
            {materialsToShow.map((material, index) => (
              <div
                key={material._id}
                className="p-5 bg-gray-50 border border-gray-100 rounded-2xl flex items-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-lg font-semibold text-primary mr-4">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {material.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: material.description.substring(0, 100),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {!isAuthenticated && materials.length > 3 && (
            <motion.div
              className="mt-6 text-center p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-gray-900 font-sans">
                Ingin lihat lebih lanjut?
              </h3>
              <p className="text-gray-600 mt-2">
                Daftar atau login untuk melihat semua materi dan mendaftar di
                kursus ini.
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal('LOGIN')}
                className="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-opacity-90 transition-all duration-200"
              >
                Login atau Daftar
              </motion.button>
            </motion.div>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <span className="text-2xl font-bold text-gray-900">GRATIS</span>
            {isAuthenticated ? (
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleEnrollClick}
                disabled={isEnrolling}
                className="mt-4 w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnrolling ? 'Mendaftarkan...' : 'Daftar ke Kursus Ini'}
              </motion.button>
            ) : (
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal('LOGIN')}
                className="mt-4 w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200"
              >
                Login untuk Mendaftar
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetailPage;
