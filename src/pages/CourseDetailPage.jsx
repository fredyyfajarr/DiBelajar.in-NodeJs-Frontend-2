/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useEnrollInCourse } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';
import useModalStore from '/src/store/modalStore.js';
import CourseReviews from '../components/CourseReviews';

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-700 text-xl font-semibold">Memuat detail kursus...</p>
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md mx-4"
        >
          <div className="w-24 h-24 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-pink-700 mb-3">Oops! Terjadi Kesalahan</h2>
          <p className="text-pink-600">Gagal memuat kursus. Silakan coba lagi nanti.</p>
        </motion.div>
      </div>
    );
  }

  const { course, materials } = data || {};
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md mx-4"
        >
          <div className="w-24 h-24 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.004-5.824-2.412M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a1 1 0 00-1-1H10a1 1 0 00-1 1v-.694z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-purple-700 mb-3">Kursus Tidak Ditemukan</h2>
          <p className="text-purple-600">Maaf, kursus yang Anda cari tidak tersedia.</p>
        </motion.div>
      </div>
    );
  }

  const materialsToShow = isAuthenticated ? materials : materials.slice(0, 3);

  const handleEnrollClick = () => {
    enroll(course.slug || course._id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.15
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      y: -3,
      transition: { duration: 0.2, type: "spring", stiffness: 400 } 
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-transparent">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Section */}
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-semibold mb-6 shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Kursus Online
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
              >
                {course.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {(course.instructorId?.name || 'Instruktur Ahli').charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-xl">
                    {course.instructorId?.name || 'Instruktur Ahli'}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="prose prose-lg prose-pink max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </motion.div>

            {/* Course Materials */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-10">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Materi Kursus
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-transparent rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                {materialsToShow.map((material, index) => (
                  <motion.div
                    key={material._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="group bg-white/80 backdrop-blur-lg border border-pink-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
                          {material.title}
                        </h3>
                        <div 
                          className="text-gray-600 leading-relaxed mb-6"
                          dangerouslySetInnerHTML={{
                            __html: material.description.substring(0, 200) + '...',
                          }}
                        />
                        <div className="flex items-center gap-8 text-sm text-gray-600">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-pink-100 rounded-2xl flex items-center justify-center">
                              <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="font-medium">15 menit</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-2xl flex items-center justify-center">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-medium">Video</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full border-3 border-pink-200 group-hover:border-pink-500 transition-colors duration-300 relative flex items-center justify-center">
                          <div className="w-3 h-3 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {!isAuthenticated && materials.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10"
                >
                  <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl p-12 text-center border-2 border-dashed border-pink-300 shadow-xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Masih Ada {materials.length - 3} Materi Lagi!
                    </h3>
                    <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                      Daftar atau login sekarang untuk mengakses semua materi kursus dan mulai belajar.
                    </p>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => openModal('LOGIN')}
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-4 text-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login atau Daftar Gratis
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Reviews */}
            <motion.div variants={itemVariants}>
              <CourseReviews courseSlug={courseSlug} />
            </motion.div>
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-100 overflow-hidden sticky top-8"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
                    <span className="text-pink-600 font-bold text-2xl">GRATIS</span>
                  </div>
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center text-pink-500">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-3 font-bold text-gray-800 text-lg">4.8</span>
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">
                    {materials?.length || 0} Materi
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleEnrollClick}
                    disabled={isEnrolling}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-lg"
                  >
                    {isEnrolling ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mendaftarkan...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Daftar ke Kursus Ini
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => openModal('LOGIN')}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login untuk Mendaftar
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;

/* backup */
// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useCourseDetail } from '/src/hooks/useCourses.js';
// import { useEnrollInCourse } from '/src/hooks/useStudent.js';
// import useAuthStore from '/src/store/authStore.js';
// import useModalStore from '/src/store/modalStore.js';
// import CourseReviews from '../components/CourseReviews';

// const CourseDetailPage = () => {
//   const { courseSlug } = useParams();
//   const { data, isLoading, isError } = useCourseDetail(courseSlug);
//   const { isAuthenticated } = useAuthStore();
//   const { openModal } = useModalStore();
//   const { mutate: enroll, isPending: isEnrolling } = useEnrollInCourse();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center p-8"
//         >
//           <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//           <p className="text-gray-700 text-xl font-semibold">Memuat detail kursus...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center p-8 max-w-md mx-4"
//         >
//           <div className="w-24 h-24 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-pink-700 mb-3">Oops! Terjadi Kesalahan</h2>
//           <p className="text-pink-600">Gagal memuat kursus. Silakan coba lagi nanti.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   const { course, materials } = data || {};
//   if (!course) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center p-8 max-w-md mx-4"
//         >
//           <div className="w-24 h-24 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.004-5.824-2.412M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a1 1 0 00-1-1H10a1 1 0 00-1 1v-.694z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-purple-700 mb-3">Kursus Tidak Ditemukan</h2>
//           <p className="text-purple-600">Maaf, kursus yang Anda cari tidak tersedia.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   const materialsToShow = isAuthenticated ? materials : materials.slice(0, 3);

//   const handleEnrollClick = () => {
//     enroll(course.slug || course._id);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1, 
//       transition: { 
//         duration: 0.8,
//         staggerChildren: 0.15
//       } 
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const buttonVariants = {
//     hover: { 
//       scale: 1.05, 
//       y: -3,
//       transition: { duration: 0.2, type: "spring", stiffness: 400 } 
//     },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100">
//       <motion.div
//         className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-10">
//             {/* Header Section */}
//             <motion.div variants={itemVariants}>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-semibold mb-6 shadow-sm"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//                 Kursus Online
//               </motion.div>
              
//               <motion.h1 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
//               >
//                 {course.title}
//               </motion.h1>
              
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center gap-4 mb-8"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-2xl">
//                     {(course.instructorId?.name || 'Instruktur Ahli').charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-gray-900 font-bold text-xl">
//                     {course.instructorId?.name || 'Instruktur Ahli'}
//                   </p>
//                 </div>
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="prose prose-lg prose-pink max-w-none text-gray-700 leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: course.description }}
//               />
//             </motion.div>

//             {/* Course Materials */}
//             <motion.div variants={itemVariants}>
//               <div className="flex items-center gap-6 mb-10">
//                 <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
//                   <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <h2 className="text-4xl font-bold text-gray-900">
//                   Materi Kursus
//                 </h2>
//                 <div className="flex-1 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-transparent rounded-full"></div>
//               </div>
              
//               <div className="space-y-6">
//                 {materialsToShow.map((material, index) => (
//                   <motion.div
//                     key={material._id}
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.15 }}
//                     className="group bg-white/80 backdrop-blur-lg border border-pink-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500"
//                   >
//                     <div className="flex items-start gap-6">
//                       <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                         {index + 1}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
//                           {material.title}
//                         </h3>
//                         <div 
//                           className="text-gray-600 leading-relaxed mb-6"
//                           dangerouslySetInnerHTML={{
//                             __html: material.description.substring(0, 200) + '...',
//                           }}
//                         />
//                         <div className="flex items-center gap-8 text-sm text-gray-600">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-pink-100 rounded-2xl flex items-center justify-center">
//                               <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                               </svg>
//                             </div>
//                             <span className="font-medium">15 menit</span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-purple-100 rounded-2xl flex items-center justify-center">
//                               <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                               </svg>
//                             </div>
//                             <span className="font-medium">Video</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex-shrink-0">
//                         <div className="w-8 h-8 rounded-full border-3 border-pink-200 group-hover:border-pink-500 transition-colors duration-300 relative flex items-center justify-center">
//                           <div className="w-3 h-3 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
              
//               {!isAuthenticated && materials.length > 3 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="mt-10"
//                 >
//                   <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl p-12 text-center border-2 border-dashed border-pink-300 shadow-xl">
//                     <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
//                       <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                       Masih Ada {materials.length - 3} Materi Lagi!
//                     </h3>
//                     <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
//                       Daftar atau login sekarang untuk mengakses semua materi kursus dan mulai belajar.
//                     </p>
//                     <motion.button
//                       variants={buttonVariants}
//                       whileHover="hover"
//                       whileTap="tap"
//                       onClick={() => openModal('LOGIN')}
//                       className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-4 text-lg"
//                     >
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                       Login atau Daftar Gratis
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* Reviews */}
//             <motion.div variants={itemVariants}>
//               <CourseReviews courseSlug={courseSlug} />
//             </motion.div>
//           </div>

//           {/* Sidebar Card */}
//           <div className="lg:col-span-1">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-100 overflow-hidden sticky top-8"
//             >
//               <div className="relative">
//                 <img
//                   src={course.thumbnail}
//                   alt={course.title}
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="absolute top-6 right-6">
//                   <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
//                     <span className="text-pink-600 font-bold text-2xl">GRATIS</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-10">
//                 <div className="flex items-center justify-between mb-10">
//                   <div className="flex items-center text-pink-500">
//                     <div className="flex gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
//                           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-3 font-bold text-gray-800 text-lg">4.8</span>
//                   </div>
//                   <div className="text-gray-600 font-semibold text-lg">
//                     {materials?.length || 0} Materi
//                   </div>
//                 </div>
                
//                 {isAuthenticated ? (
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={handleEnrollClick}
//                     disabled={isEnrolling}
//                     className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-lg"
//                   >
//                     {isEnrolling ? (
//                       <>
//                         <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Mendaftarkan...
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                         </svg>
//                         Daftar ke Kursus Ini
//                       </>
//                     )}
//                   </motion.button>
//                 ) : (
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={() => openModal('LOGIN')}
//                     className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 text-lg"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                     </svg>
//                     Login untuk Mendaftar
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CourseDetailPage;