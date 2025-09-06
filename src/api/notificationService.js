import axiosInstance from './axiosInstance';

export const getNotifications = async () => {
  // Hapus duplikasi '/api'
  const response = await axiosInstance.get('/notifications');
  return response.data.data;
};

export const markNotificationAsRead = async (notificationId) => {
  // Hapus duplikasi '/api'
  const response = await axiosInstance.put(
    `/notifications/${notificationId}/read`
  );
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  // Hapus duplikasi '/api'
  const response = await axiosInstance.put('/notifications/read-all');
  return response.data;
};
