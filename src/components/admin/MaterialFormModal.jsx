// src/components/admin/MaterialFormModal.jsx

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import Controller
import Modal from '/src/components/Modal.jsx';
import { useCreateMaterial, useUpdateMaterial } from '/src/hooks/useAdmin.js';

// Import Froala Editor
import FroalaEditor from 'react-froala-wysiwyg';

const MaterialFormModal = ({
  isOpen,
  onClose,
  mode,
  currentMaterial,
  courseId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control, // Kita butuh 'control' untuk komponen pihak ketiga
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { mutate: createMaterial, isPending: isCreating } = useCreateMaterial();
  const { mutate: updateMaterial, isPending: isUpdating } = useUpdateMaterial();

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && currentMaterial) {
        reset({
          title: currentMaterial.title,
          description: currentMaterial.description,
        });
      } else {
        reset({
          title: '',
          description: '',
        });
      }
    }
  }, [currentMaterial, mode, reset, isOpen]);

  const onSubmit = (data) => {
    if (mode === 'edit') {
      updateMaterial(
        { courseId, materialId: currentMaterial._id, materialData: data },
        { onSuccess: onClose }
      );
    } else {
      createMaterial({ courseId, materialData: data }, { onSuccess: onClose });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    // Perbesar ukuran modal di sini
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-4xl">
        {' '}
        {/* Contoh: max-w-4xl */}
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Materi' : 'Tambah Materi Baru'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Judul Materi</label>
            <input
              {...register('title', { required: 'Judul wajib diisi' })}
              className="mt-1 block w-full border rounded-md p-2"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* --- Ganti textarea dengan Rich Text Editor --- */}
          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Deskripsi wajib diisi' }}
              render={({ field: { onChange, value } }) => (
                <FroalaEditor
                  tag="textarea"
                  model={value}
                  onModelChange={onChange}
                  config={{
                    placeholderText: 'Tulis deskripsi materi di sini...',
                    heightMin: 200,
                  }}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* ------------------------------------------- */}

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

export default MaterialFormModal;
