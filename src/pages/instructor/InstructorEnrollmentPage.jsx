// src/pages/instructor/InstructorEnrollmentPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEnrollmentsByCourse } from '/src/hooks/useAdmin.js';

const InstructorEnrollmentPage = () => {
  const { courseId } = useParams();
  const { data: response, isLoading } = useEnrollmentsByCourse(courseId);

  const enrollments = response?.data?.data || [];
  const courseTitle =
    enrollments.length > 0 ? enrollments[0].courseId?.title : 'Kursus';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <Link
          to="/instructor/courses"
          className="text-sm text-primary hover:underline mb-2 inline-block"
        >
          &larr; Kembali ke Kursus Saya
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans mt-2">
          Pendaftar di Kursus:{' '}
          <span className="font-normal">{courseTitle}</span>
        </h1>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {isLoading ? (
          <p className="text-center py-4 text-gray-600">Memuat...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Nama Siswa
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enroll) => (
                    <tr
                      key={enroll._id}
                      className="block md:table-row mb-4 border border-gray-100 rounded-xl shadow-sm md:border-b md:rounded-none md:shadow-none hover:bg-gray-50"
                    >
                      <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Nama:
                        </span>
                        {enroll.userId?.name || 'N/A'}
                      </td>
                      <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Email:
                        </span>
                        {enroll.userId?.email || 'N/A'}
                      </td>
                      {/* --- PERBAIKAN DI SINI --- */}
                      <td className="p-3 block md:table-cell text-right md:text-left">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Aksi:
                        </span>
                        <Link
                          to={`/instructor/courses/${courseId}/student-progress/${enroll.userId?._id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          Lihat Progres
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-600">
                      Belum ada pendaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InstructorEnrollmentPage;
