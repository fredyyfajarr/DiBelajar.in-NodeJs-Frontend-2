import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BLOK build DI BAWAH INI
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // Ini akan menghapus semua console.log saat build
      },
    },
  },
});
