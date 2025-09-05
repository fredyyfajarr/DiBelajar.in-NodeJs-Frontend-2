/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useUpdateProgress } from '/src/hooks/useStudent.js';
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import ForumModal from '../../components/ForumModal.jsx';

// Komponen untuk menampilkan setiap langkah progres (checklist)
const ProgressStep = ({
  label,
  isCompleted,
  isDisabled,
  onClick,
  buttonText,
}) => {
  // ... (Tidak ada perubahan di komponen ini) ...
  const CheckboxIcon = () => (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
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
  );

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg min-h-[52px]">
      <div className="flex items-center">
        <CheckboxIcon />
        <span
          className={`font-medium ${
            isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {label}
        </span>
      </div>
      {!isCompleted && (
        <button
          onClick={onClick}
          disabled={isDisabled}
          className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Komponen untuk setiap kartu materi dengan layout baru
const MaterialItem = ({
  material,
  index,
  onButtonClick,
  progress,
  courseId,
  courseSlug,
}) => {
  // // DEBUG 3: Tampilkan data material dan progress yang diterima komponen ini
  // console.log(`[MaterialItem #${index + 1}] Data Material:`, material);
  // console.log(`[MaterialItem #${index + 1}] Data Progress Diterima:`, progress);

  const testCompleted = progress?.hasCompletedTest || false;
  const assignmentSubmitted = progress?.hasSubmittedAssignment || false;
  const forumPostCount = progress?.forumPostCount || 0;
  const materialCompleted = progress?.isCompleted || false;
  const hasTest = material.testContent && material.testContent.length > 0;

  // DEBUG 4: Tampilkan hasil kalkulasi status progres
  // console.log(`[MaterialItem #${index + 1}] Status Kalkulasi:`, {
  //   hasTest,
  //   testCompleted,
  //   assignmentSubmitted,
  //   forumPostCount,
  //   materialCompleted,
  // });

  const { mutate: updateProgress } = useUpdateProgress();
  const handleCompleteMaterial = () => {
    if (window.confirm('Apakah Anda yakin ingin menyelesaikan materi ini?')) {
      updateProgress({
        courseId: courseId,
        materialId: material._id,
        step: 'completion',
        courseSlug,
      });
    }
  };

  const canCompleteMaterial =
    (hasTest ? testCompleted : true) &&
    assignmentSubmitted &&
    forumPostCount >= 2 &&
    !materialCompleted;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`p-6 bg-white border rounded-2xl shadow-sm transition-all duration-200 ${
        materialCompleted ? 'border-green-500 bg-green-50' : 'border-gray-100'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 font-sans mb-2">
            #{index + 1}: {material.title}
          </h3>
          <div
            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: material.description }}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-3 p-4 bg-gray-100 rounded-lg border">
            <h4 className="font-semibold text-center mb-2 text-gray-700">
              Progres Anda
            </h4>
            {hasTest && (
              <ProgressStep
                label="Kerjakan Tes"
                isCompleted={testCompleted}
                isDisabled={testCompleted}
                onClick={() => onButtonClick('test', material)}
                buttonText="Mulai Tes"
              />
            )}
            <ProgressStep
              label="Kumpulkan Tugas"
              isCompleted={assignmentSubmitted}
              isDisabled={(hasTest && !testCompleted) || assignmentSubmitted}
              onClick={() => onButtonClick('assignment', material)}
              buttonText="Kumpulkan"
            />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg min-h-[52px]">
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    forumPostCount >= 2 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {forumPostCount >= 2 && (
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
                    forumPostCount >= 2
                      ? 'text-gray-400 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  Diskusi Forum ({forumPostCount}/2 Post)
                </span>
              </div>
              <button
                onClick={() => onButtonClick('forum', material)}
                disabled={!assignmentSubmitted}
                className="px-4 py-1.5 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
              >
                Diskusi
              </button>
            </div>
          </div>
          {canCompleteMaterial && (
            <div className="mt-4">
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
        </div>
      </div>
    </motion.div>
  );
};

// Komponen utama LearningPage
const LearningPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // DEBUG 1: Tampilkan data mentah dari API
  // useEffect(() => {
  //   if (data) {
  //     console.log('========================================');
  //     console.log('DEBUG 1: Data mentah dari hook useCourseDetail:', data);
  //     console.log('========================================');
  //   }
  // }, [data]);

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

  // DEBUG 2: Tampilkan data setelah di-destructure
  // console.log('DEBUG 2: Data setelah di-destructure:', {
  //   course,
  //   materials,
  //   enrollment,
  // });

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
      <div className="flex flex-col gap-6">
        {materials.map((material, index) => {
          const materialProgress = enrollment?.progress.find(
            (p) => p.materialId.toString() === material._id.toString()
          );
          return (
            <MaterialItem
              key={material._id}
              material={material}
              index={index}
              onButtonClick={handleOpenModal}
              progress={materialProgress}
              courseId={course._id}
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
