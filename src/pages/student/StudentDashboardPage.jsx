import React from 'react';
import useAuthStore from '/src/store/authStore.js';
import { useMyEnrollments } from '/src/hooks/useStudent.js';
import { Link } from 'react-router-dom';

const CourseItem = ({ enrollment }) => (
  <Link
    to={`/learn/${enrollment.courseId.slug || enrollment.courseId._id}`}
    className="block"
  >
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center gap-4">
      <img
        src={enrollment.courseId.thumbnail}
        alt={enrollment.courseId.title}
        className="w-32 h-20 object-cover rounded-md"
      />
      <div>
        <h3 className="font-bold text-lg text-text-primary">
          {enrollment.courseId.title}
        </h3>
        <p className="text-sm text-text-muted">Lanjutkan Belajar &rarr;</p>
      </div>
    </div>
  </Link>
);

const StudentDashboardPage = () => {
  const { user } = useAuthStore();
  const { data: response, isLoading } = useMyEnrollments(user._id);

  // --- BARIS YANG DIPERBAIKI ---
  const enrollments = response?.data?.data || [];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        Selamat Datang, {user.name}!
      </h1>
      <p className="text-text-muted mb-8">
        Ini adalah daftar kursus yang sedang kamu ikuti. Teruslah belajar!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading && <p>Memuat kursus Anda...</p>}
        {!isLoading && enrollments.length === 0 && (
          <div className="md:col-span-2 text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-text-muted">
              Anda belum terdaftar di kursus manapun.
            </p>
            <Link
              to="/"
              className="text-primary font-semibold hover:underline mt-2 inline-block"
            >
              Cari Kursus Sekarang
            </Link>
          </div>
        )}
        {!isLoading &&
          enrollments.map((enroll) => (
            <CourseItem key={enroll._id} enrollment={enroll} />
          ))}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
