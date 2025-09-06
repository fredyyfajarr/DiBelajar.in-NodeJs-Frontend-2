import React from 'react';
import { useParams } from 'react-router-dom';
// Anda perlu membuat hook baru untuk ini
// import { useUserProfile } from '/src/hooks/useUser.js';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { userSlug } = useParams();
  // const { data: profile, isLoading } = useUserProfile(userSlug);

  // Data dummy untuk sekarang
  const isLoading = false;
  const profile = {
    name: 'Nama Siswa',
    bio: 'Ini adalah bio singkat siswa yang bersemangat belajar hal baru!',
    completedCourses: [
      /* array of course objects */
    ],
  };

  if (isLoading) return <p>Memuat profil...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold">{profile.name}</h1>
      <p className="text-gray-600 mt-2">
        {profile.bio || 'Pengguna ini belum menulis bio.'}
      </p>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold">Kursus yang Telah Selesai</h2>
      {/* Tampilkan daftar kursus yang selesai di sini */}
    </div>
  );
};

export default ProfilePage;
