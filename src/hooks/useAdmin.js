import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from '/src/api/adminService.js';
import studentService from '../api/studentService';
import useAuthStore from '/src/store/authStore.js';

const queryOptions = {
  staleTime: 5 * 60 * 1000, // Data dianggap fresh selama 5 menit
  refetchOnWindowFocus: false, // Jangan fetch ulang saat window di-fokus
};

// === HOOKS PENGGUNA (Sudah Ada) ===
// Hook untuk mengambil data pengguna dengan filter & paginasi
export const useUsers = (params) => {
  return useQuery({
    queryKey: ['admin', 'users', params], // Query key dinamis
    queryFn: () => adminService.getAllUsers(params),
  });
};

// --- MUTATIONS UNTUK CRUD ---
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData }) =>
      adminService.updateUser(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

// === HOOKS KURSUS (Tambahkan Ini) ===
export const useAdminCourses = (params) => {
  return useQuery({
    queryKey: ['admin', 'courses', params],
    queryFn: () => adminService.getAllCourses(params),
  });
};

export const useInstructors = () => {
  const { user } = useAuthStore(); // Ambil data pengguna yang login
  return useQuery({
    queryKey: ['admin', 'instructors'],
    queryFn: () => adminService.getAllUsers({ role: 'instructor' }),
    // Hanya aktifkan hook ini jika yang login adalah ADMIN
    enabled: user?.role === 'admin',
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook untuk mengambil daftar instruktur (untuk dropdown)

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, formData }) =>
      adminService.updateCourse(courseId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] });
    },
  });
};

// === HOOKS MATERI (Tambahkan Ini) ===
export const useMaterials = (courseId) => {
  return useQuery({
    // Query key sekarang menyertakan courseId agar unik
    queryKey: ['admin', 'materials', courseId],
    queryFn: () => adminService.getMaterialsByCourse(courseId),
    enabled: !!courseId, // Hanya aktif jika courseId ada
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, materialData }) =>
      adminService.createMaterial(courseId, materialData),
    onSuccess: (data, variables) => {
      // Muat ulang daftar materi untuk kursus yang spesifik
      queryClient.invalidateQueries({
        queryKey: ['admin', 'materials', variables.courseId],
      });
    },
  });
};

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, materialId, materialData }) =>
      adminService.updateMaterial(courseId, materialId, materialData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'materials', variables.courseId],
      });
    },
  });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, materialId }) =>
      adminService.deleteMaterial(courseId, materialId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'materials', variables.courseId],
      });
    },
  });
};

// === HOOK STATISTIK (Tambahkan Ini) ===
export const useStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: adminService.getStats,
  });
};

// === HOOKS PENDAFTARAN (Tambahkan Ini) ===
export const useEnrollments = (params) => {
  return useQuery({
    queryKey: ['admin', 'enrollments', params],
    queryFn: () => adminService.getAllEnrollments(params),
  });
};

export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteEnrollment,
    onSuccess: () => {
      // Setelah berhasil menghapus, muat ulang data pendaftaran
      queryClient.invalidateQueries({ queryKey: ['admin', 'enrollments'] });
    },
  });
};

// === HOOKS DETAIL MATERI (Tambahkan Ini) ===
export const useSubmissions = (courseId, materialId) => {
  return useQuery({
    queryKey: ['admin', 'submissions', courseId, materialId],
    queryFn: () => adminService.getSubmissions(courseId, materialId),
    enabled: !!courseId && !!materialId,
    ...queryOptions,
  });
};

export const useTestResults = (courseId, materialId) => {
  return useQuery({
    queryKey: ['admin', 'testResults', courseId, materialId],
    queryFn: () => adminService.getTestResults(courseId, materialId),
    enabled: !!courseId && !!materialId,
    ...queryOptions,
  });
};

// export const useForumPosts = (courseId, materialId) => {
//   return useQuery({
//     queryKey: ['admin', 'forumPosts', courseId, materialId],
//     queryFn: () => adminService.getForumPosts(courseId, materialId),
//     enabled: !!courseId && !!materialId,
//     ...queryOptions,
//   });
// };

export const useMaterialDetail = (courseId, materialId) => {
  return useQuery({
    queryKey: ['admin', 'materialDetail', courseId, materialId],
    queryFn: () => adminService.getMaterialDetail(courseId, materialId),
    enabled: !!courseId && !!materialId,
    ...queryOptions,
  });
};

// === HOOK BARU UNTUK PENDAFTARAN PER KURSUS ===
export const useEnrollmentsByCourse = (courseId) => {
  return useQuery({
    queryKey: ['admin', 'enrollments', courseId],
    queryFn: () => adminService.getEnrollmentsByCourse(courseId),
    enabled: !!courseId,
    ...queryOptions,
  });
};

/**
 * Hook untuk mengambil data postingan forum.
 */
export const useForumPosts = (courseId, materialId) => {
  return useQuery({
    queryKey: ['forum-posts', materialId], // Kunci query unik untuk materi ini
    queryFn: () => studentService.getForumPosts({ courseId, materialId }),
    enabled: !!materialId, // Hanya aktif jika materialId ada
  });
};

/**
 * Hook untuk membuat postingan forum baru.
 */
export const useCreateForumPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentService.createForumPost,
    onSuccess: (data, variables) => {
      // Invalidate query postingan forum agar post baru muncul di modal
      queryClient.invalidateQueries({
        queryKey: ['forum-posts', variables.materialId],
      });
      // TAMBAHKAN INI: Invalidate query detail kursus agar counter di LearningPage terupdate
      queryClient.invalidateQueries({
        queryKey: ['course', variables.courseSlug],
      });
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mengirim postingan.');
    },
  });
};

export const useStudentProgress = (courseId, userId) => {
  return useQuery({
    queryKey: ['studentProgress', courseId, userId],
    queryFn: () => adminService.getStudentProgress(courseId, userId),
    enabled: !!courseId && !!userId, // Hanya aktif jika kedua ID ada
  });
};
