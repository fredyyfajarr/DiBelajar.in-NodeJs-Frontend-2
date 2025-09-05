// src/components/CourseReviews.jsx

import React from 'react';
import { useCourseReviews } from '/src/hooks/useStudent.js'; // Hook yang sudah kita buat

// Komponen kecil untuk menampilkan rating bintang (hanya display)
const StaticStarRating = ({ rating }) => {
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            className="w-5 h-5"
            fill={starValue <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

const CourseReviews = ({ courseSlug }) => {
  const { data: response, isLoading, isError } = useCourseReviews(courseSlug);
  const reviews = response?.data?.data || [];

  if (isLoading) {
    return <p className="text-gray-600">Memuat ulasan...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Gagal memuat ulasan.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 font-sans mb-6">
        Ulasan dari Siswa
      </h2>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-50 p-5 rounded-xl border border-gray-100"
            >
              <div className="flex items-center mb-2">
                <StaticStarRating rating={review.rating} />
                <p className="ml-4 font-semibold text-gray-800">
                  {review.userId?.name || 'Siswa'}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4 bg-gray-50 rounded-xl">
          Belum ada ulasan untuk kursus ini. Jadilah yang pertama!
        </p>
      )}
    </div>
  );
};

export default CourseReviews;
