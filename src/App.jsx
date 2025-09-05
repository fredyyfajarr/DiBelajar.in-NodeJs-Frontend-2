import React, { Suspense } from 'react'; // Pastikan Suspense di-import
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

// Halaman-halaman di-import menggunakan React.lazy
const LandingPage = React.lazy(() => import('/src/pages/LandingPage.jsx'));
const AllCoursesPage = React.lazy(() =>
  import('/src/pages/AllCoursesPage.jsx')
); // <-- 1. IMPORT HALAMAN BARU
const CourseDetailPage = React.lazy(() =>
  import('/src/pages/CourseDetailPage.jsx')
);
const DashboardPage = React.lazy(() => import('/src/pages/DashboardPage.jsx'));
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
const InstructorEnrollmentPage = React.lazy(() =>
  import('/src/pages/instructor/InstructorEnrollmentPage.jsx')
);
const StudentDashboardPage = React.lazy(() =>
  import('/src/pages/student/StudentDashboardPage.jsx')
);
const LearningPage = React.lazy(() =>
  import('/src/pages/student/LearningPage.jsx')
);

const CertificatePage = React.lazy(() =>
  import('/src/pages/student/CertificatePage.jsx')
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* MainLayout akan menangani Suspense fallback */}
          {/* Rute Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<LandingPage />} />
          <Route path="/courses" element={<AllCoursesPage />} />{' '}
          {/* <-- 2. TAMBAHKAN RUTE BARU */}
          <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
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
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
