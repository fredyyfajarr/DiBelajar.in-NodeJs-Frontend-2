/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useStats } from '/src/hooks/useAdmin.js';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4"
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-3xl text-primary">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
    </div>
  </motion.div>
);

const AdminDashboardPage = () => {
  const { data: response, isLoading } = useStats();
  const stats = response?.data?.data;

  if (isLoading) {
    return (
      <p className="text-center py-8 text-gray-600">Loading dashboard...</p>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans mb-6">
        Dashboard Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Pengguna" value={stats?.totalUsers} icon="👥" />
        <StatCard title="Total Kursus" value={stats?.totalCourses} icon="📚" />
        <StatCard
          title="Total Pendaftaran"
          value={stats?.totalEnrollments}
          icon="🎓"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-sans">
            Pengguna Baru Terdaftar
          </h2>
          <ul className="space-y-3">
            {stats?.recentUsers.map((user) => (
              <li key={user._id} className="text-sm text-gray-600">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-sans">
            Kursus Baru Dibuat
          </h2>
          <ul className="space-y-3">
            {stats?.recentCourses.map((course) => (
              <li key={course._id} className="text-sm text-gray-600">
                {course.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
