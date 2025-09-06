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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateProgress,
    onSuccess: (data, variables) => {
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
    enabled: !!courseSlug && !!isCourseCompleted,
  });
};

export const useCourseReviews = (courseSlug) => {
  return useQuery({
    queryKey: ['reviews', courseSlug],
    queryFn: () => studentService.getReviewsByCourse(courseSlug),
    enabled: !!courseSlug,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.addReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', variables.courseSlug],
      });
      alert('Terima kasih atas ulasan Anda!');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal mengirim ulasan.');
    },
  });
};

export const useMyReview = (courseSlug) => {
  return useQuery({
    queryKey: ['my-review', courseSlug],
    queryFn: () => studentService.getMyReview(courseSlug),
    enabled: !!courseSlug,
    retry: false,
    select: (data) => data.data, // Ambil data dari lapisan dalam
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', variables.courseSlug],
      });
      alert('Ulasan berhasil diperbarui!');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal memperbarui ulasan.');
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.deleteReview,
    onSuccess: (data, courseSlug) => {
      queryClient.removeQueries({
        queryKey: ['my-review', courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', courseSlug],
      });
      alert('Ulasan berhasil dihapus.');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Gagal menghapus ulasan.');
    },
  });
};
