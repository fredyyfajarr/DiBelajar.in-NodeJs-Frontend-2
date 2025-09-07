import { create } from 'zustand';

const useToastStore = create((set, get) => ({
  toasts: [],
  
  // Menambahkan toast baru
  addToast: (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info', // default type
      title: '',
      message: '',
      duration: 4000, // default 4 seconds
      ...toast,
    };
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));
    
    // Auto remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration);
    }
    
    return id;
  },
  
  // Menghapus toast berdasarkan ID
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },
  
  // Menghapus semua toast
  clearToasts: () => {
    set({ toasts: [] });
  },
  
  // Helper methods untuk berbagai jenis toast
  success: (message, options = {}) => {
    return get().addToast({
      type: 'success',
      title: options.title || 'Berhasil!',
      message,
      ...options
    });
  },
  
  error: (message, options = {}) => {
    return get().addToast({
      type: 'error',
      title: options.title || 'Error!',
      message,
      duration: options.duration || 5000, // Error toast stays longer
      ...options
    });
  },
  
  warning: (message, options = {}) => {
    return get().addToast({
      type: 'warning',
      title: options.title || 'Peringatan!',
      message,
      ...options
    });
  },
  
  info: (message, options = {}) => {
    return get().addToast({
      type: 'info',
      title: options.title || 'Info',
      message,
      ...options
    });
  },
  
  // Untuk konfirmasi logout dan action lainnya
  confirm: (message, options = {}) => {
    return get().addToast({
      type: 'confirm',
      title: options.title || 'Konfirmasi',
      message,
      duration: 0, // Manual dismiss only
      ...options
    });
  }
}));

export default useToastStore;
