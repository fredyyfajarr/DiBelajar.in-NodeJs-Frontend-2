import axiosInstance from './axiosInstance.js';

/**
 * Mengambil semua kursus (untuk landing page)
 */
const getAll = async (params = {}) => {
  const response = await axiosInstance.get('/courses', { params });
  return response.data; // Mengembalikan seluruh objek respons { success, data, pagination, ... }
};

/**
 * Mencari kursus berdasarkan keyword
 * @param {string} keyword - Kata kunci pencarian
 */
const search = async (keyword) => {
  // Kirim keyword sebagai query parameter ke backend
  const response = await axiosInstance.get(`/courses?keyword=${keyword}`);
  return response.data.data;
};

const getDetail = async (slug) => {
  const response = await axiosInstance.get(`/courses/${slug}`);
  return response.data.data; // Mengembalikan { course, materials }
};

export default {
  getAll,
  search,
  getDetail,
};
