// src/components/TestModal.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useSubmitTestResult } from '/src/hooks/useStudent.js';

const TestModal = ({ isOpen, onClose, courseId, material }) => {
  const { register, handleSubmit } = useForm();
  const { mutate: submitResult, isPending } = useSubmitTestResult();
  const questions = material?.testContent || [];

  const onSubmit = (data) => {
    let correctAnswers = 0;
    const submittedAnswers = [];

    questions.forEach((question, index) => {
      // Dapatkan jawaban yang dipilih student dari form
      const studentAnswerIndex = parseInt(data.answers[index], 10);
      const studentAnswer = question.options[studentAnswerIndex];

      // Cek jika jawaban student benar
      if (studentAnswer?.isCorrect) {
        correctAnswers++;
      }

      // Siapkan data untuk dikirim ke backend
      submittedAnswers.push({
        questionId: question._id,
        answer: studentAnswer?.optionText || 'Tidak dijawab',
      });
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    submitResult(
      {
        courseId,
        materialId: material._id,
        resultData: { score, answers: submittedAnswers },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Tes: {material?.title}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
        >
          {questions.map((question, qIndex) => (
            <div key={question._id || qIndex}>
              <p className="font-semibold">
                {qIndex + 1}. {question.questionText}
              </p>
              <div className="pl-4 mt-2 space-y-1">
                {question.options.map((option, oIndex) => (
                  <label
                    key={option._id || oIndex}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      value={oIndex}
                      {...register(`answers.${qIndex}`, { required: true })}
                    />
                    {option.optionText}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-primary text-white rounded-md font-semibold disabled:opacity-50"
            >
              {isPending ? 'Mengirim...' : 'Selesai & Kirim Jawaban'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TestModal;
