/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StaticStarRating from './StaticStarRating';

const CourseCard = ({ course }) => {
  const thumbnailUrl =
    course.thumbnail ||
    'https://placehold.co/600x400/7c3aed/white?text=DiBelajar.in';

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        to={`/courses/${course.slug || course._id}`}
        className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
      >
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 text-xs font-bold rounded-full">
            GRATIS
          </span>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600">
              Oleh {course.instructorId?.name || 'Instruktur Ahli'}
            </p>
            <div className="mt-2">
              <StaticStarRating
                rating={course.averageRating}
                reviewCount={course.reviewCount}
              />
          </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
