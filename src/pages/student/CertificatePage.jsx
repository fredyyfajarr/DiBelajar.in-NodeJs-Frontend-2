// src/pages/student/CertificatePage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
// --- 1. IMPORT HOOK YANG DIBUTUHKAN ---
import { useCertificateData } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';

const CertificatePage = () => {
  const { courseSlug } = useParams();
  const { user } = useAuthStore(); // Ambil data user yang login

  // --- 2. PANGGIL HOOK UNTUK MENGAMBIL DATA SERTIFIKAT ---
  // Kita set 'isCourseCompleted' ke true karena halaman ini hanya bisa diakses jika sudah selesai
  const {
    data: response,
    isLoading,
    isError,
  } = useCertificateData(courseSlug, true);

  const certificateData = response?.data?.data;

  // Format tanggal agar lebih mudah dibaca
  const completionDate = certificateData?.completionDate
    ? new Date(certificateData.completionDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Tanggal tidak tersedia';

  const handlePrint = () => {
    window.print();
  };

  // --- 3. TAMBAHKAN KONDISI LOADING DAN ERROR ---
  if (isLoading) {
    return <div className="text-center py-20">Memuat data sertifikat...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>
          Gagal memuat data sertifikat. Pastikan Anda telah menyelesaikan semua
          materi.
        </p>
        <Link
          to={`/learn/${courseSlug}`}
          className="text-primary hover:underline mt-4 inline-block"
        >
          Kembali ke Halaman Belajar
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Tombol Cetak (Akan disembunyikan saat print) */}
      <div className="print:hidden container mx-auto text-center py-8">
        <button
          onClick={handlePrint}
          className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          Cetak atau Simpan sebagai PDF
        </button>
      </div>

      {/* Area Sertifikat (SEKARANG DENGAN DATA DINAMIS) */}
      <div className="certificate-container w-[1123px] h-[794px] mx-auto my-0 p-12 relative font-sans">
        <img
          src="/sertifikat-template.jpg"
          alt="Sertifikat"
          className="absolute top-0 left-0 w-full h-full -z-10"
        />

        <div className="text-center text-[#07294D]">
          <p className="mt-[210px] text-lg">SERTIFIKAT INI DIBERIKAN KEPADA</p>
          <h1 className="text-6xl font-bold mt-4 tracking-wider">
            {/* Gunakan data dinamis */}
            {(certificateData?.studentName || user.name).toUpperCase()}
          </h1>
          <p className="text-lg mt-12">TELAH BERHASIL MENYELESAIKAN KURSUS</p>
          <h2 className="text-4xl font-semibold mt-4">
            {/* Gunakan data dinamis */}
            {certificateData?.courseTitle}
          </h2>
          <p className="text-lg mt-20">
            Sertifikat ini diberikan kepada peserta yang telah menyelesaikan
            kursus online di DiBelajar.in dengan standar pembelajaran yang
            terstruktur, terukur, dan relevan dengan kebutuhan industri.
          </p>
          <p className="mt-12 text-xl font-semibold">
            {/* Gunakan data dinamis */}
            {completionDate}
          </p>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
