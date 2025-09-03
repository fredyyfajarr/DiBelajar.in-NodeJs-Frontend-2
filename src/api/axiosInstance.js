import axios from 'axios';
import useAuthStore from '/src/store/authStore.js';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor untuk menyisipkan token JWT secara otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari Zustand store
    const token = useAuthStore.getState().token;
    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers['Authorization'] = `${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']; // biar browser set otomatis
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
