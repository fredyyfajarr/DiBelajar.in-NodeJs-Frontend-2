// src/utils/getDashboardPath.js

export const getDashboardPath = (user) => {
  if (!user) {
    // Jika tidak ada info user, arahkan ke halaman utama
    return '/';
  }

  // Tentukan path berdasarkan role user
  switch (user.role) {
    case 'admin':
      return '/admin';
    case 'instructor':
      return '/instructor/courses';
    case 'student':
      return '/student-dashboard';
    default:
      // Sebagai fallback jika role tidak dikenal
      return '/dashboard';
  }
};
