// src/pages/CourseDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

  // 1. Tampilkan status loading
  if (isLoading) {
    return <div className="text-center p-10">Memuat detail kursus...</div>;
  }

  // 2. Tampilkan pesan error jika request gagal
  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">
        Gagal memuat kursus. Silakan coba lagi.
      </div>
    );
  }

  // 3. Destructure data HANYA SETELAH kita yakin tidak ada error dan tidak sedang loading
  const { course, materials } = data;

  const materialsToShow = isAuthenticated ? materials : materials.slice(0, 3);

  const handleEnrollClick = () => {
    enroll(course.slug || course._id);
  };

  // 4. Render halaman jika semua data aman
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Konten Utama */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            {course.title}
          </h1>
          <p className="text-md text-text-muted mt-2">
            Oleh {course.instructorId?.name || 'Instruktur Ahli'}
          </p>
          <p className="mt-6 text-text-primary leading-relaxed">
            {course.description}
          </p>

          <hr className="my-8 border-border" />

          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Materi Kursus
          </h2>
          <div className="space-y-3">
            {materialsToShow.map((material, index) => (
              <div
                key={material._id}
                className="p-4 border border-border rounded-md bg-gray-50 flex items-center"
              >
                <span className="text-lg font-bold text-primary mr-4">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {material.title}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {material.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!isAuthenticated && materials.length > 3 && (
            <div className="mt-6 text-center p-6 bg-background rounded-lg border-2 border-dashed border-border">
              <h3 className="font-semibold text-text-primary">
                Ingin lihat lebih lanjut?
              </h3>
              <p className="text-text-muted">
                Daftar atau login untuk melihat semua materi dan mendaftar di
                kursus ini.
              </p>
              <button
                onClick={() => openModal('LOGIN')}
                className="mt-4 bg-primary text-white font-semibold py-2 px-6 rounded-md hover:opacity-90"
              >
                Login atau Daftar
              </button>
            </div>
          )}
        </div>

        {/* Kolom Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <span className="text-2xl font-bold text-text-primary">GRATIS</span>

            {isAuthenticated ? (
              <button
                onClick={handleEnrollClick}
                disabled={isEnrolling}
                className="mt-4 w-full bg-secondary text-white font-bold py-3 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnrolling ? 'Mendaftarkan...' : 'Daftar ke Kursus Ini'}
              </button>
            ) : (
              <button
                onClick={() => openModal('LOGIN')}
                className="mt-4 w-full bg-secondary text-white font-bold py-3 rounded-md hover:opacity-90"
              >
                Login untuk Mendaftar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
