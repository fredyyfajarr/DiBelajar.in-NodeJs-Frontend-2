import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '/src/components/Modal.jsx';
import {
  useCreateCourse,
  useUpdateCourse,
  useInstructors,
} from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';

const CourseFormModal = ({ isOpen, onClose, mode, currentCourse }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState(null);

  const { user } = useAuthStore();
  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();
  const { data: instructorsResponse } = useInstructors();
  const instructors = instructorsResponse?.data?.data || [];

  const thumbnailFile = watch('thumbnail');

  useEffect(() => {
    if (thumbnailFile && thumbnailFile.length > 0) {
      const file = thumbnailFile[0];
      setPreview(URL.createObjectURL(file));
      return () => URL.revokeObjectURL(file);
    } else if (mode === 'edit' && currentCourse?.thumbnail) {
      setPreview(currentCourse.thumbnail);
    } else {
      setPreview(null);
    }
  }, [thumbnailFile, currentCourse, mode]);

  useEffect(() => {
    if (mode === 'edit' && currentCourse) {
      reset({
        title: currentCourse.title,
        description: currentCourse.description,
        instructorId: currentCourse.instructorId._id,
      });
    } else {
      reset({ title: '', description: '', instructorId: '' });
      if (user?.role === 'instructor') {
        setValue('instructorId', user._id);
      }
    }
  }, [currentCourse, mode, reset, isOpen, user, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('instructorId', data.instructorId || user._id);

    if (data.thumbnail && data.thumbnail[0] instanceof File) {
      formData.append('thumbnail', data.thumbnail[0]);
    }

    if (mode === 'edit') {
      updateCourse(
        { courseId: currentCourse._id, formData },
        {
          onSuccess: onClose,
        }
      );
    } else {
      createCourse(formData, {
        onSuccess: onClose,
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Kursus' : 'Tambah Kursus Baru'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Judul Kursus
            </label>
            <input
              {...register('title', { required: 'Judul wajib diisi' })}
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Deskripsi
            </label>
            <textarea
              {...register('description', {
                required: 'Deskripsi wajib diisi',
              })}
              rows="4"
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {user?.role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Instruktur
              </label>
              <select
                {...register('instructorId', {
                  required: 'Instruktur wajib dipilih',
                })}
                className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
              >
                <option value="">-- Pilih Instruktur --</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
              {errors.instructorId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.instructorId.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-muted">
              Thumbnail
            </label>
            <input
              type="file"
              {...register('thumbnail', {
                required: mode === 'add' ? 'Thumbnail wajib diupload' : false,
              })}
              accept="image/png, image/jpeg"
              className="mt-1 block w-full text-sm"
            />
            {preview && (
              <img
                src={preview}
                alt="Thumbnail preview"
                className="mt-2 h-24 w-auto rounded-md"
              />
            )}
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
            >
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseFormModal;
