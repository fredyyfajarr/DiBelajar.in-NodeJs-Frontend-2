// src/api/userService.js
import axiosInstance from './axiosInstance.js';

const getUserProfile = (slug) => {
  return axiosInstance.get(`/users/${slug}/profile`);
};

export default {
  getUserProfile,
};
