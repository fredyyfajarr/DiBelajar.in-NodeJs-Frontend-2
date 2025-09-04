import axiosInstance from './axiosInstance.js';

const enrollInCourse = (courseId) => {
  return axiosInstance.post(`/courses/${courseId}/enrollments`);
};

const getMyEnrollments = (userId) => {
  return axiosInstance.get(`/users/${userId}/enrollments`);
};
const submitAssignment = ({ courseId, materialId, formData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/assignments`,
    formData
  );
};

const submitTestResult = ({ courseId, materialId, resultData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/tests`,
    resultData
  );
};

/**
 * Mengambil semua postingan forum untuk sebuah materi.
 */
const getForumPosts = ({ courseId, materialId }) => {
  return axiosInstance.get(
    `/courses/${courseId}/materials/${materialId}/forum/posts`
  );
};

/**
 * Membuat postingan baru di forum.
 * @param {Object} payload - Berisi courseId, materialId, dan data post { text }.
 */
const createForumPost = ({ courseId, materialId, postData }) => {
  return axiosInstance.post(
    `/courses/${courseId}/materials/${materialId}/forum/posts`,
    postData
  );
};

const updateProgress = ({ courseId, materialId, step }) => {
  // Kita hanya perlu mengirim 'step', courseId dan materialId sudah ada di URL
  return axiosInstance.put(
    `/courses/${courseId}/materials/${materialId}/progress`,
    { step }
  );
};

export default {
  enrollInCourse,
  getMyEnrollments,
  submitAssignment,
  submitTestResult,
  getForumPosts,
  createForumPost,
  updateProgress,
};
