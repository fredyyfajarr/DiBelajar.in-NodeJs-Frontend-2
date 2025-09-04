import { useQuery } from '@tanstack/react-query';
import courseService from '/src/api/courseService.js';

/**
 * Hook untuk mengambil data kursus dengan dukungan parameter (paginasi, filter, search).
 * @param {object} params - Objek parameter query, contoh: { page: 1, limit: 8, keyword: 'react' }
 */
export const useCourses = (params) => {
  return useQuery({
    // Query key sekarang menyertakan params agar data di-cache secara unik
    queryKey: ['courses', params],
    queryFn: () => courseService.getAll(params),
    keepPreviousData: true, // Fitur bagus untuk paginasi agar data lama tidak hilang saat memuat halaman baru
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
