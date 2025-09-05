// src/pages/student/CertificatePage.jsx

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCertificateData } from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';

const CertificatePage = () => {
  const { courseSlug } = useParams();
  const { user } = useAuthStore();
  const {
    data: response,
    isLoading,
    isError,
  } = useCertificateData(courseSlug, true);

  useEffect(() => {
    const styleId = 'certificate-print-style';
    document.getElementById(styleId)?.remove();

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @media print {
        @page {
          size: A4 landscape;
          margin: 0 !important;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .printable-area, .printable-area * {
          visibility: visible;
        }
        body * {
          visibility: hidden;
        }
        
        .certificate-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        /* --- PERBAIKAN POSISI UNTUK PRINT --- */
        .cert-student-name { top: 305px !important; } /* NAIKKAN NAMA SISWA */
        .cert-course-title { top: 410px !important; } /* NAIKKAN NAMA KURSUS */
        .cert-completion-date { bottom: 150px !important; } /* TURUNKAN TANGGAL */
        /* ------------------------------------ */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, []);

  const certificateData = response?.data?.data;
  const completionDate = certificateData?.completionDate
    ? new Date(certificateData.completionDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ' ';

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <div className="text-center py-20">Memuat data sertifikat...</div>;
  }
  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Gagal memuat data. Pastikan kursus telah selesai.</p>
        <Link
          to={`/learn/${courseSlug}`}
          className="text-primary hover:underline mt-4"
        >
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="printable-area bg-gray-200 pb-16">
      <div className="print:hidden container mx-auto text-center py-8">
        <button
          onClick={handlePrint}
          className="bg-primary text-white font-semibold py-3 px-8 rounded-lg"
        >
          Cetak atau Simpan sebagai PDF
        </button>
      </div>

      <div className="certificate-container w-[1123px] h-[794px] mx-auto my-0 relative shadow-lg text-center">
        <img
          src="/sertifikat-template.jpg"
          alt="Sertifikat"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* 1. Nama Siswa (Tambahkan className="cert-student-name") */}
        <div className="cert-student-name absolute w-full left-1/2 -translate-x-1/2 top-[305px]">
          <h2 className="text-5xl font-bold" style={{ color: '#07294D' }}>
            {(certificateData?.studentName || user.name).toUpperCase()}
          </h2>
        </div>

        {/* 2. Nama Kursus (Tambahkan className="cert-course-title") */}
        <div className="cert-course-title absolute w-full left-1/2 -translate-x-1/2 top-[410px]">
          <h3 className="text-4xl font-semibold" style={{ color: '#07294D' }}>
            {certificateData?.courseTitle}
          </h3>
        </div>

        {/* 3. Tanggal Kelulusan (Tambahkan className="cert-completion-date") */}
        <div className="cert-completion-date absolute w-full left-1/2 -translate-x-1/2 bottom-[115px]">
          <p className="text-lg font-medium" style={{ color: '#334155' }}>
            {completionDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
