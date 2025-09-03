// src/store/modalStore.js
import { create } from 'zustand';

const useModalStore = create((set) => ({
  modalView: null, // Bisa 'LOGIN', 'REGISTER', 'FORGOT_PASSWORD', atau null
  isModalOpen: false,
  openModal: (view) => set({ isModalOpen: true, modalView: view }),
  closeModal: () => set({ isModalOpen: false, modalView: null }),
}));

export default useModalStore;
