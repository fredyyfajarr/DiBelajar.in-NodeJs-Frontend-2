import axios from './axiosInstance';

export const getNotifications = async () => {
  const response = await axios.get('/api/notifications');
  return response.data.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await axios.put(`/api/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axios.put('/api/notifications/read-all');
  return response.data;
};
