/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import ForumModal from '../../components/ForumModal.jsx';

const MaterialItem = ({ material, index, onButtonClick }) => {
  const hasTest = material.testContent && material.testContent.length > 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 font-sans mb-2">
        #{index + 1}: {material.title}
      </h3>
      <p
        className="text-gray-600 leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{ __html: material.description }}
      />
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => onButtonClick('assignment', material)}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-opacity-90 transition-all duration-200"
        >
          Kumpulkan Tugas
        </button>
        {hasTest && (
          <button
            onClick={() => onButtonClick('test', material)}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-all duration-200"
          >
            Mulai Tes
          </button>
        )}
        <button
          onClick={() => onButtonClick('forum', material)}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-all duration-200"
        >
          Ikuti Diskusi
        </button>
      </div>
    </motion.div>
  );
};

const LearningPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleOpenModal = (modalType, material) => {
    setSelectedMaterial(material);
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedMaterial(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Memuat kursus...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Gagal memuat kursus.
      </div>
    );
  }

  const { course, materials } = data;

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans leading-tight">
          {course.title}
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Oleh {course.instructorId?.name}
        </p>
      </div>
      <hr className="my-8 border-gray-200" />
      <h2 className="text-2xl font-semibold text-gray-900 font-sans mb-6">
        Materi Pembelajaran
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material, index) => (
          <MaterialItem
            key={material._id}
            material={material}
            index={index}
            onButtonClick={handleOpenModal}
          />
        ))}
      </div>
      {selectedMaterial && (
        <>
          <SubmissionModal
            isOpen={activeModal === 'assignment'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
          />
          <TestModal
            isOpen={activeModal === 'test'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
          />
          <ForumModal
            isOpen={activeModal === 'forum'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
          />
        </>
      )}
    </motion.div>
  );
};

export default LearningPage;
