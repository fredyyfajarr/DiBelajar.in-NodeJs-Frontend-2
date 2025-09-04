import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '/src/components/Modal.jsx';
import { useCreateUser, useUpdateUser } from '/src/hooks/useAdmin.js';

const UserFormModal = ({ isOpen, onClose, mode, currentUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  useEffect(() => {
    if (mode === 'edit' && currentUser) {
      reset({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      });
    } else {
      reset({ name: '', email: '', password: '', role: 'student' });
    }
  }, [currentUser, mode, reset, isOpen]);

  const onSubmit = (data) => {
    if (mode === 'edit') {
      if (!data.password) delete data.password;
      updateUser(
        { userId: currentUser._id, userData: data },
        {
          onSuccess: onClose,
        }
      );
    } else {
      createUser(data, {
        onSuccess: onClose,
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* --- UKURAN DIPERBESAR DI SINI --- */}
      <div className="p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Nama
            </label>
            <input
              {...register('name', { required: 'Nama wajib diisi' })}
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email wajib diisi' })}
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: mode === 'add' ? 'Password wajib diisi' : false,
              })}
              placeholder={
                mode === 'edit' ? 'Kosongkan jika tidak ingin ganti' : ''
              }
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted">
              Role
            </label>
            <select
              {...register('role')}
              className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
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

export default UserFormModal;
