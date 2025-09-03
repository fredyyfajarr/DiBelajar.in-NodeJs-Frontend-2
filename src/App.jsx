import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Layout
import MainLayout from '/src/layouts/MainLayout.jsx';

// Pages
import LandingPage from '/src/pages/LandingPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage';
import DashboardPage from '/src/pages/DashboardPage.jsx';
import AdminDashboardPage from '/src/pages/admin/AdminDashboardPage.jsx';
import UserManagementPage from '/src/pages/admin/UserManagementPage.jsx';
import CourseManagementPage from '/src/pages/admin/CourseManagementPage.jsx';
import MaterialManagementPage from '/src/pages/admin/MaterialManagementPage.jsx';
import MaterialDetailPage from '/src/pages/admin/MaterialDetailPage.jsx';
import EnrollmentManagementPage from '/src/pages/admin/EnrollmentManagementPage.jsx';
import InstructorEnrollmentPage from '/src/pages/instructor/InstructorEnrollmentPage.jsx';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import LearningPage from './pages/student/LearningPage';

// Components
import ProtectedRoute from '/src/components/ProtectedRoute.jsx';
import RoleBasedRoute from '/src/components/RoleBasedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout sekarang menjadi 'pintu gerbang' untuk semua halaman */}
        <Route element={<MainLayout />}>
          {/* Rute Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<LandingPage />} />
          <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />

          {/* Rute Terproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* --- TAMBAHKAN RUTE STUDENT DI SINI --- */}
            <Route
              path="/student-dashboard"
              element={<StudentDashboardPage />}
            />
            <Route path="/learn/:courseSlug" element={<LearningPage />} />

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

              {/* 👇 TAMBAHKAN RUTE BARU DI SINI 👇 */}
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
