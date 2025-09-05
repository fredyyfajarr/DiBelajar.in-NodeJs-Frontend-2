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
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 100vh;
        }

        .certificate-container img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        /* Sembunyikan tombol print */
        .print\\:hidden {
          display: none !important;
        }
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
    <div className="printable-area bg-gray-200 p-4 sm:p-8">
      <div className="print:hidden container mx-auto text-center mb-8">
        <button
          onClick={handlePrint}
          className="bg-primary text-white font-semibold py-3 px-8 rounded-lg"
        >
          Cetak atau Simpan sebagai PDF
        </button>
      </div>

      {/* --- CERTIFICATE CONTAINER --- */}
      <div className="certificate-container w-full max-w-5xl mx-auto aspect-[1123/794] relative shadow-lg text-center">
        <img
          src="/sertifikat-template.jpg"
          alt="Sertifikat"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Posisi Nama Siswa */}
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-[38.5%] lg:top-[35.5%]">
          <h2
            className="text-[2.5vw] sm:text-[2.2vw] md:text-[2.8vw] lg:text-[3.5rem] font-bold"
            style={{ color: '#07294D' }}
          >
            {(certificateData?.studentName || user.name).toUpperCase()}
          </h2>
        </div>

        {/* Posisi Nama Kursus */}
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-[52.5%] lg:top-[50.5%]">
          <h3
            className="text-[1.8vw] sm:text-[1.5vw] md:text-[2vw] lg:text-[2.25rem] font-semibold"
            style={{ color: '#07294D' }}
          >
            {certificateData?.courseTitle}
          </h3>
        </div>

        {/* Posisi Tanggal */}
        <div
          className="absolute w-full left-1/2 -translate-x-1/2"
          style={{ bottom: '14.5%' }}
        >
          <p
            className="text-[1.2vw] sm:text-[1vw] md:text-[1.2vw] lg:text-[1.125rem] font-medium"
            style={{ color: '#334155' }}
          >
            {completionDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
