// src/pages/student/LearningPage.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetail } from '/src/hooks/useCourses.js';
// Kita akan import modal-modal di sini nanti
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import ForumModal from '../../components/ForumModal.jsx';

// Komponen untuk satu item materi
const MaterialItem = ({ material, index, onButtonClick }) => {
  // Cek apakah materi ini memiliki konten tes
  const hasTest = material.testContent && material.testContent.length > 0;

  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-bold text-primary mb-2">
        #{index + 1}: {material.title}
      </h3>
      <p className="text-text-primary">{material.description}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onButtonClick('assignment', material)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Kumpulkan Tugas
        </button>

        {hasTest && (
          <button
            onClick={() => onButtonClick('test', material)}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700"
          >
            Mulai Tes
          </button>
        )}

        <button
          onClick={() => onButtonClick('forum', material)}
          className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Ikuti Diskusi
        </button>
      </div>
    </div>
  );
};

// Komponen Halaman Utama
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

  if (isLoading) {
    return <div className="text-center p-10">Memuat kursus...</div>;
  }
  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">Gagal memuat kursus.</div>
    );
  }

  const { course, materials } = data;

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-text-primary">{course.title}</h1>
        <p className="text-md text-text-muted mt-2">
          Oleh {course.instructorId?.name}
        </p>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Materi Pembelajaran
        </h2>
        <div className="space-y-4">
          {materials.map((material, index) => (
            <MaterialItem
              key={material._id}
              material={material}
              index={index}
              onButtonClick={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* Kita akan mulai dengan Submission Modal */}
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
    </>
  );
};

export default LearningPage;
