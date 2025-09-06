import axiosInstance from './axiosInstance.js';

const getAll = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data.data;
};

const create = async (categoryData) => {
  const response = await axiosInstance.post('/categories', categoryData);
  return response.data.data;
};

const remove = async (id) => {
  await axiosInstance.delete(`/categories/${id}`);
};

export default { getAll, create, remove };
