import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useSubmitAssignment } from '/src/hooks/useStudent.js';

const SubmissionModal = ({ isOpen, onClose, courseId, material }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: submit, isPending } = useSubmitAssignment();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('submissionFile', data.submissionFile[0]);

    submit(
      { courseId, materialId: material._id, formData },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-1">Kumpulkan Tugas</h2>
        <p className="text-text-muted mb-4">
          Untuk materi: <span className="font-semibold">{material?.title}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Pilih File Tugas
            </label>
            <input
              type="file"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              {...register('submissionFile', {
                required: 'Anda harus memilih file.',
              })}
            />
            {errors.submissionFile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.submissionFile.message}
              </p>
            )}
          </div>
          <div className="pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-md font-semibold disabled:opacity-50"
            >
              {isPending ? 'Mengunggah...' : 'Kumpulkan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SubmissionModal;
