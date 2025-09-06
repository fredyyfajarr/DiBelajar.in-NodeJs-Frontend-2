import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthStore from '/src/store/authStore.js';
import { useUpdateUser } from '/src/hooks/useAdmin.js'; // Bisa dipakai ulang

const EditProfilePage = () => {
  const { user, updateUser: updateUserInStore } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio || '',
    },
  });
  const { mutate: updateUser, isPending } = useUpdateUser();

  const onSubmit = (data) => {
    if (!data.password) delete data.password;

    updateUser(
      { userId: user._id, userData: data },
      {
        onSuccess: (response) => {
          updateUserInStore(response.data); // Update state di Zustand
          alert('Profil berhasil diperbarui!');
        },
        onError: (error) => {
          alert(error.response?.data?.error || 'Gagal memperbarui profil.');
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Profil</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            {...register('name', { required: 'Nama tidak boleh kosong' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio Singkat
          </label>
          <textarea
            {...register('bio', {
              maxLength: {
                value: 250,
                message: 'Bio tidak boleh lebih dari 250 karakter',
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            rows="3"
            placeholder="Ceritakan sedikit tentang diri Anda..."
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Baru
          </label>
          <input
            type="password"
            {...register('password', {
              minLength: { value: 8, message: 'Password minimal 8 karakter' },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Kosongkan jika tidak ingin diubah"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-right">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
