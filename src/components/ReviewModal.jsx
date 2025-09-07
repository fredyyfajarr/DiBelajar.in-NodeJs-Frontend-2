import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import useToastStore from '/src/store/toastStore.js';
import {
  useAddReview,
  useUpdateReview,
  useDeleteReview,
} from '/src/hooks/useStudent.js';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-10 h-10 cursor-pointer ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => setRating(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewModal = ({
  isOpen,
  onClose,
  courseSlug,
  mode = 'add',
  currentReview,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);

  const { mutate: addReview, isPending: isAdding } = useAddReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();
  const { warning, success, error, confirm } = useToastStore();

  useEffect(() => {
    // console.log('currentReview di useEffect:', currentReview); // Tambahkan log ini
    if (mode === 'edit' && currentReview) {
      reset({ comment: currentReview.comment || '' });
      setRating(currentReview.rating || 0);
      // console.log('Rating diatur ke:', currentReview.rating || 0); // Tambahkan log ini
    } else {
      reset({ comment: '' });
      setRating(0);
    }
  }, [mode, currentReview, reset, isOpen]);

  const onSubmit = (data) => {
    if (rating === 0) {
      warning('Anda harus memberikan rating bintang.', {
        title: 'Rating Diperlukan'
      });
      return;
    }
    const reviewData = { rating, comment: data.comment };

    if (mode === 'edit') {
      updateReview(
        { courseSlug, reviewData },
        {
          onSuccess: () => {
            success('Ulasan berhasil diperbarui');
            onClose();
          },
          onError: () => {
            error('Gagal memperbarui ulasan');
          }
        }
      );
    } else {
      addReview(
        { courseSlug, reviewData },
        {
          onSuccess: () => {
            success('Ulasan berhasil ditambahkan');
            setRating(0);
            onClose();
          },
          onError: () => {
            error('Gagal menambahkan ulasan');
          }
        }
      );
    }
  };

  const handleDelete = () => {
    confirm('Apakah Anda yakin ingin menghapus ulasan ini?', {
      title: 'Konfirmasi Hapus',
      actions: [
        {
          label: 'Batal',
          handler: () => {},
          primary: false
        },
        {
          label: 'Hapus',
          handler: () => {
            deleteReview(courseSlug, { 
              onSuccess: () => {
                success('Ulasan berhasil dihapus');
                onClose();
              },
              onError: () => {
                error('Gagal menghapus ulasan');
              }
            });
          },
          primary: true
        }
      ]
    });
  };

  const isPending = isAdding || isUpdating || isDeleting;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-text-primary">
          {mode === 'edit' ? 'Edit Ulasan Anda' : 'Tulis Ulasan Anda'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-center text-sm font-medium text-text-muted mb-2">
              Beri Rating Kursus
            </label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-text-muted"
            >
              Ulasan Anda
            </label>
            <textarea
              id="comment"
              rows="4"
              className="mt-1 block w-full border border-border rounded-lg shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Bagikan pengalaman belajar Anda di kursus ini..."
              {...register('comment', {
                required: 'Ulasan tidak boleh kosong.',
                minLength: {
                  value: 10,
                  message: 'Ulasan minimal 10 karakter.',
                },
              })}
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-3">
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus...' : 'Hapus Ulasan'}
              </button>
            )}
            <div className="flex-1 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {isPending
                  ? 'Mengirim...'
                  : mode === 'edit'
                  ? 'Simpan Perubahan'
                  : 'Kirim Ulasan'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
