import React from 'react';
import { useStats } from '/src/hooks/useAdmin.js';
import { Link } from 'react-router-dom';

// Komponen kecil untuk setiap kartu statistik
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm font-medium text-text-muted">{title}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { data: response, isLoading } = useStats();
  const stats = response?.data?.data;

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Dashboard Admin
      </h1>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Pengguna" value={stats?.totalUsers} icon="👥" />
        <StatCard title="Total Kursus" value={stats?.totalCourses} icon="📚" />
        <StatCard
          title="Total Pendaftaran"
          value={stats?.totalEnrollments}
          icon="🎓"
        />
      </div>

      {/* Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pengguna Baru */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Pengguna Baru Terdaftar
          </h2>
          <ul className="space-y-3">
            {stats?.recentUsers.map((user) => (
              <li key={user._id} className="text-sm text-text-muted">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>

        {/* Kursus Baru */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Kursus Baru Dibuat</h2>
          <ul className="space-y-3">
            {stats?.recentCourses.map((course) => (
              <li key={course._id} className="text-sm text-text-muted">
                {course.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
