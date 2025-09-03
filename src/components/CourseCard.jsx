/* eslint-disable no-unused-vars */
// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Varian animasi untuk kartu saat muncul
const cardVariants = {
  hidden: { y: 20, opacity: 0 }, // Mulai dari bawah 20px dan transparan
  visible: { y: 0, opacity: 1 }, // Kembali ke posisi asli dan muncul
};

const CourseCard = ({ course }) => {
  // Menyediakan URL fallback jika thumbnail tidak ada
  const thumbnailUrl =
    course.thumbnail ||
    'https://placehold.co/600x400/7c3aed/white?text=DiBelajar.in';

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link
        to={`/courses/${course.slug || course._id}`}
        className="block group h-full"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Gambar Thumbnail */}
          <div className="relative">
            <img
              src={thumbnailUrl}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-0 right-0 m-2">
              <span className="bg-secondary text-white px-2 py-1 text-xs font-bold rounded">
                GRATIS
              </span>
            </div>
          </div>

          {/* Detail Kursus */}
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold text-text-primary mb-1 h-12 group-hover:text-primary transition-colors duration-200">
                {course.title}
              </h3>
              <p className="text-sm text-text-muted mb-2">
                Oleh {course.instructorId?.name || 'Instruktur Ahli'}
              </p>
            </div>

            {/* Anda bisa menambahkan rating atau info lain di sini di masa depan */}
            {/* <div className="text-sm text-amber-500">★★★★☆ (123)</div> */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
