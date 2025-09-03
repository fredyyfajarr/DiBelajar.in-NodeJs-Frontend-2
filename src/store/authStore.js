// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 'persist' akan menyimpan state ke localStorage secara otomatis
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // Aksi untuk menyimpan data setelah login berhasil
      login: (userData, token) =>
        set({ user: userData, token, isAuthenticated: true }),
      // Aksi untuk membersihkan data setelah logout
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Hapus juga dari localStorage
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage', // Nama key di localStorage
    }
  )
);

export default useAuthStore;
