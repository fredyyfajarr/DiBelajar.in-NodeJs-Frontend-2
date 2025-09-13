// src/pages/SettingsPage.jsx

import React from 'react';
import useTheme from '../hooks/useTheme'; // Impor hook tema

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Display</h2>
        <div className="flex items-center justify-between">
          <p>Theme</p>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Perlu fitur ganti password atau hapus akun? Ini tempatnya.
        </p>
        {/* Tambahkan fungsionalitas lainnya di sini */}
      </div>
    </div>
  );
};

export default SettingsPage;
