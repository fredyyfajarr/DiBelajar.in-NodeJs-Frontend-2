// Utility function untuk toast yang bisa digunakan di hooks dan service
// Import store secara langsung untuk digunakan di luar komponen React

import useToastStore from '/src/store/toastStore.js';

// Fungsi helper untuk mengakses toast store di luar komponen
export const toast = {
  success: (message, options = {}) => {
    const store = useToastStore.getState();
    return store.success(message, options);
  },
  
  error: (message, options = {}) => {
    const store = useToastStore.getState();
    return store.error(message, options);
  },
  
  warning: (message, options = {}) => {
    const store = useToastStore.getState();
    return store.warning(message, options);
  },
  
  info: (message, options = {}) => {
    const store = useToastStore.getState();
    return store.info(message, options);
  },
  
  confirm: (message, options = {}) => {
    const store = useToastStore.getState();
    return store.confirm(message, options);
  }
};

export default toast;
