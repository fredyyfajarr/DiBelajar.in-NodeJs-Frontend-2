import { useQuery } from '@tanstack/react-query';
import courseService from '/src/api/courseService.js';

/**
 * Hook untuk mengambil SEMUA kursus.
 * @param {boolean} enabled - Apakah hook ini harus aktif atau tidak.
 */
export const useCourses = (enabled = true) => {
  return useQuery({
    queryKey: ['courses', 'all'],
    queryFn: courseService.getAll,
    enabled, // Hanya akan fetch data jika 'enabled' bernilai true
  });
};

/**
 * Hook untuk MENCARI kursus berdasarkan query.
 * @param {string} query - Kata kunci pencarian.
 */
export const useSearchCourses = (query) => {
  return useQuery({
    queryKey: ['courses', 'search', query],
    queryFn: () => courseService.search(query),
    enabled: !!query, // Hanya aktif jika 'query' tidak kosong
  });
};

/**
 * Hook untuk mengambil detail satu kursus beserta materinya.
 * @param {string} slug - Slug dari kursus yang akan diambil.
 */
export const useCourseDetail = (slug) => {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => courseService.getDetail(slug),
    enabled: !!slug, // Hanya aktif jika slug tidak kosong
  });
};
