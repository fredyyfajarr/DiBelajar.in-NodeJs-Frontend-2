import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Layout dan komponen Rute
import MainLayout from '/src/layouts/MainLayout.jsx';
import ProtectedRoute from '/src/components/ProtectedRoute.jsx';
import RoleBasedRoute from '/src/components/RoleBasedRoute.jsx';
import ToastContainer from '/src/components/Toast.jsx';

// Halaman-halaman di-import menggunakan React.lazy
const LandingPage = React.lazy(() => import('/src/pages/LandingPage.jsx'));
const AllCoursesPage = React.lazy(() =>
  import('/src/pages/AllCoursesPage.jsx')
);
const CourseDetailPage = React.lazy(() =>
  import('/src/pages/CourseDetailPage.jsx')
);
const DashboardPage = React.lazy(() => import('/src/pages/DashboardPage.jsx'));

// Halaman baru untuk profil
const EditProfilePage = React.lazy(() =>
  import('/src/pages/EditProfilePage.jsx')
);
const ProfilePage = React.lazy(() => import('/src/pages/ProfilePage.jsx'));

// Halaman baru untuk pengaturan
const SettingsPage = React.lazy(() => import('/src/pages/SettingsPage.jsx'));

// Halaman About dan Contact
const AboutPage = React.lazy(() => import('/src/pages/AboutPage.jsx'));
const ContactPage = React.lazy(() => import('/src/pages/ContactPage.jsx'));

// Halaman Admin
const AdminDashboardPage = React.lazy(() =>
  import('/src/pages/admin/AdminDashboardPage.jsx')
);
const UserManagementPage = React.lazy(() =>
  import('/src/pages/admin/UserManagementPage.jsx')
);
const CourseManagementPage = React.lazy(() =>
  import('/src/pages/admin/CourseManagementPage.jsx')
);
const MaterialManagementPage = React.lazy(() =>
  import('/src/pages/admin/MaterialManagementPage.jsx')
);
const MaterialDetailPage = React.lazy(() =>
  import('/src/pages/admin/MaterialDetailPage.jsx')
);
const EnrollmentManagementPage = React.lazy(() =>
  import('/src/pages/admin/EnrollmentManagementPage.jsx')
);
const CategoryManagementPage = React.lazy(() =>
  import('/src/pages/admin/CategoryManagementPage.jsx')
);

// Halaman Instruktur
const InstructorEnrollmentPage = React.lazy(() =>
  import('/src/pages/instructor/InstructorEnrollmentPage.jsx')
);
const StudentProgressPage = React.lazy(() =>
  import('/src/pages/instructor/StudentProgressPage.jsx')
);

// Halaman Siswa
const StudentDashboardPage = React.lazy(() =>
  import('/src/pages/student/StudentDashboardPage.jsx')
);
const LearningPage = React.lazy(() =>
  import('/src/pages/student/LearningPage.jsx')
);
const CertificatePage = React.lazy(() =>
  import('/src/pages/student/CertificatePage.jsx')
);
// Anda juga memerlukan halaman analitik
const CourseAnalyticsPage = React.lazy(() =>
  import('/src/pages/instructor/CourseAnalyticsPage.jsx')
);

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Rute Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<LandingPage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile/:userSlug" element={<ProfilePage />} />{' '}
          {/* <-- RUTE PROFIL PUBLIK */}
          {/* Rute Terproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/student-dashboard"
              element={<StudentDashboardPage />}
            />
            <Route path="/learn/:courseSlug" element={<LearningPage />} />
            <Route
              path="/learn/:courseSlug/certificate"
              element={<CertificatePage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />{' '}
            <Route path="/settings" element={<SettingsPage />} />
            {/* <-- RUTE EDIT PROFIL (PRIVAT) */}
            {/* Rute Khusus Admin */}
            <Route
              path="/admin"
              element={<RoleBasedRoute allowedRoles={['admin']} />}
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route
                path="courses/:courseId/materials"
                element={<MaterialManagementPage />}
              />
              <Route
                path="courses/:courseId/materials/:materialId"
                element={<MaterialDetailPage />}
              />
              <Route
                path="enrollments"
                element={<EnrollmentManagementPage />}
              />
              {/* Admin juga bisa akses analitik */}
              <Route
                path="courses/:courseId/analytics"
                element={<CourseAnalyticsPage />}
              />
              <Route path="categories" element={<CategoryManagementPage />} />
            </Route>
            {/* Rute Khusus Instruktur */}
            <Route
              path="/instructor"
              element={
                <RoleBasedRoute allowedRoles={['instructor', 'admin']} />
              }
            >
              <Route index element={<Navigate to="courses" />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route
                path="courses/:courseId/materials"
                element={<MaterialManagementPage />}
              />
              <Route
                path="courses/:courseId/materials/:materialId"
                element={<MaterialDetailPage />}
              />
              <Route
                path="courses/:courseId/enrollments"
                element={<InstructorEnrollmentPage />}
              />
              <Route
                path="courses/:courseId/student-progress/:userId"
                element={<StudentProgressPage />}
              />
              <Route
                path="courses/:courseId/analytics"
                element={<CourseAnalyticsPage />}
              />{' '}
              {/* <-- RUTE ANALITIK */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
