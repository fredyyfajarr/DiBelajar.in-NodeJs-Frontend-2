// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'theme-purple'
  );

  useEffect(() => {
    // Hapus kelas tema sebelumnya
    document.documentElement.classList.remove('theme-purple', 'theme-green');

    // Tambahkan kelas tema saat ini
    document.documentElement.classList.add(theme);

    // Simpan pilihan tema
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'theme-purple' ? 'theme-green' : 'theme-purple'
    );
  };

  return { theme, toggleTheme };
};
