/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import studentService from '/src/api/studentService.js';
import { useNavigate } from 'react-router-dom';

export const useEnrollInCourse = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: studentService.enrollInCourse,
    onSuccess: (data, courseId) => {
      alert('Selamat! Anda berhasil terdaftar di kursus ini.');
      navigate('/student-dashboard');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mendaftar ke kursus.');
    },
  });
};

export const useMyEnrollments = (userId) => {
  return useQuery({
    queryKey: ['my-enrollments', userId],
    queryFn: () => studentService.getMyEnrollments(userId),
    enabled: !!userId,
  });
};

export const useSubmitAssignment = () => {
  return useMutation({
    mutationFn: studentService.submitAssignment,
    onSuccess: () => {
      alert('Tugas berhasil dikumpulkan!');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mengumpulkan tugas.');
    },
  });
};

export const useSubmitTestResult = () => {
  return useMutation({
    mutationFn: studentService.submitTestResult,
    onSuccess: (data) => {
      const score = data.data.score;
      alert(`Tes selesai! Skor Anda: ${score}`);
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mengirimkan hasil tes.');
    },
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient(); // Pastikan useQueryClient diimpor
  return useMutation({
    mutationFn: studentService.updateProgress,
    onSuccess: (data, variables) => {
      // Baris ini adalah kuncinya.
      // 'variables.corseSlug' berasal dari data yang kita kirim saat memanggil mutate.
      // Ini memberitahu React Query bahwa data untuk 'course' dengan slug ini sudah usang
      // dan perlu diambil ulang.
      queryClient.invalidateQueries({
        queryKey: ['course', variables.courseSlug],
      });
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal memperbarui progres.');
    },
  });
};

export const useCertificateData = (courseSlug, isCourseCompleted) => {
  return useQuery({
    queryKey: ['certificateData', courseSlug],
    queryFn: () => studentService.getCertificateData(courseSlug),
    // Hanya jalankan hook ini jika courseSlug ada DAN kursus sudah selesai
    enabled: !!courseSlug && !!isCourseCompleted,
  });
};

export const useCourseReviews = (courseSlug) => {
  return useQuery({
    queryKey: ['reviews', courseSlug],
    queryFn: () => studentService.getReviewsByCourse(courseSlug),
    enabled: !!courseSlug, // Hanya aktif jika courseSlug ada
  });
};

// Hook untuk mengirim ulasan baru
export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.addReview,
    onSuccess: (data, variables) => {
      // Setelah berhasil, muat ulang daftar ulasan untuk kursus tersebut
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.courseSlug],
      });
      alert('Terima kasih atas ulasan Anda!');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mengirim ulasan.');
    },
  });
};
