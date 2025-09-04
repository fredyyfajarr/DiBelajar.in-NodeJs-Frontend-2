/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useUpdateProgress } from '/src/hooks/useStudent.js'; // Impor hook baru
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import ForumModal from '../../components/ForumModal.jsx';

const MaterialItem = ({
  material,
  index,
  onButtonClick,
  progress,
  courseSlug,
}) => {
  const { mutate: updateProgress } = useUpdateProgress();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  // Menentukan status dari setiap langkah berdasarkan data progress
  const testCompleted = progress?.hasCompletedTest || false;
  const assignmentSubmitted = progress?.hasSubmittedAssignment || false;
  const forumParticipated = progress?.hasParticipatedInForum || false;
  const materialCompleted = progress?.isCompleted || false;

  const handleCompleteMaterial = () => {
    if (window.confirm('Apakah Anda yakin ingin menyelesaikan materi ini?')) {
      updateProgress({
        courseId: material.courseId,
        materialId: material._id,
        step: 'completion',
        courseSlug, // kita butuh slug untuk invalidasi query
      });
    }
  };

  // Logika untuk menonaktifkan tombol
  const isAssignmentDisabled = !testCompleted;
  const isForumDisabled = !testCompleted || !assignmentSubmitted;
  const canCompleteMaterial =
    testCompleted &&
    assignmentSubmitted &&
    forumParticipated &&
    !materialCompleted;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className={`p-6 bg-white border rounded-2xl shadow-sm transition-all duration-200 ${
        materialCompleted ? 'border-green-500 bg-green-50' : 'border-gray-100'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 font-sans mb-2">
        #{index + 1}: {material.title}
      </h3>
      <div
        className="text-gray-600 leading-relaxed line-clamp-3 prose"
        dangerouslySetInnerHTML={{ __html: material.description }}
      />
      <div className="mt-5 flex flex-wrap gap-3">
        {/* Tombol Mulai Tes */}
        <button
          onClick={() => onButtonClick('test', material)}
          disabled={testCompleted}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {testCompleted ? 'Tes Selesai' : 'Mulai Tes'}
        </button>

        {/* Tombol Kumpulkan Tugas */}
        <button
          onClick={() => onButtonClick('assignment', material)}
          disabled={isAssignmentDisabled || assignmentSubmitted}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {assignmentSubmitted ? 'Tugas Terkumpul' : 'Kumpulkan Tugas'}
        </button>

        {/* Tombol Ikuti Diskusi */}
        <button
          onClick={() => onButtonClick('forum', material)}
          disabled={isForumDisabled}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ikuti Diskusi
        </button>
      </div>

      {/* Tombol Selesaikan Materi */}
      {canCompleteMaterial && (
        <div className="mt-4 border-t pt-4">
          <button
            onClick={handleCompleteMaterial}
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200"
          >
            Selesaikan Materi
          </button>
        </div>
      )}

      {materialCompleted && (
        <p className="mt-4 text-sm font-semibold text-green-700 text-center">
          ✓ Materi Telah Selesai
        </p>
      )}
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

  const { course, materials, enrollment } = data;

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
        {materials.map((material, index) => {
          const materialProgress = enrollment?.progress.find(
            (p) => p.materialId === material._id
          );
          return (
            <MaterialItem
              key={material._id}
              material={material}
              index={index}
              onButtonClick={handleOpenModal}
              progress={materialProgress}
              courseSlug={courseSlug}
            />
          );
        })}
      </div>
      {selectedMaterial && (
        <>
          <SubmissionModal
            isOpen={activeModal === 'assignment'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <TestModal
            isOpen={activeModal === 'test'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <ForumModal
            isOpen={activeModal === 'forum'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
        </>
      )}
    </motion.div>
  );
};

export default LearningPage;
