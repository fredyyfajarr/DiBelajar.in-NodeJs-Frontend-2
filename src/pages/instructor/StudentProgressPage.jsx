import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudentProgress } from '/src/hooks/useAdmin.js';
import { motion } from 'framer-motion';

const ProgressItem = ({ material, progressStatus }) => {
  const isCompleted = progressStatus?.isCompleted || false;

  return (
    <div
      className={`flex items-center p-4 rounded-lg border ${
        isCompleted
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
          isCompleted ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        {isCompleted && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className={`font-medium ${
          isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'
        }`}
      >
        {material.title}
      </span>
    </div>
  );
};

const StudentProgressPage = () => {
  const { courseId: courseSlug, userId: userSlug } = useParams();
  const {
    data: response,
    isLoading,
    isError,
  } = useStudentProgress(courseSlug, userSlug);

  // Tampilkan pesan loading jika data belum siap
  if (isLoading) {
    return <div className="text-center py-10">Memuat progres siswa...</div>;
  }

  // Tampilkan pesan error jika terjadi kegagalan
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Gagal memuat data. Pastikan URL benar.
      </div>
    );
  }

  // Ambil data SETELAH dipastikan tidak loading atau error
  const studentName = response?.data?.data?.enrollment?.userId?.name;
  const courseTitle = response?.data?.data?.enrollment?.courseId?.title;
  const allMaterials = response?.data?.data?.allMaterialsInCourse || [];
  const studentProgress = response?.data?.data?.enrollment?.progress || [];

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <Link
          to={`/instructor/courses/${courseSlug}/enrollments`}
          className="text-sm text-primary hover:underline mb-2 inline-block"
        >
          &larr; Kembali ke Daftar Pendaftar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Progres Belajar: <span className="font-normal">{studentName}</span>
        </h1>
        <p className="text-gray-600">
          Di dalam kursus: <strong>{courseTitle}</strong>
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Materi</h2>
        <div className="space-y-3">
          {allMaterials.map((material) => {
            const progressStatus = studentProgress.find(
              (p) => p.materialId?._id === material._id
            );
            return (
              <ProgressItem
                key={material._id}
                material={material}
                progressStatus={progressStatus}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProgressPage;
