import React from 'react';

const CertificatePage = () => {
  // Data ini nantinya akan kita ambil dari backend
  const studentName = 'Nama Siswa Lengkap';
  const courseTitle = 'Web Programming';
  const completionDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

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

      {/* Area Sertifikat */}
      <div className="certificate-container w-[1123px] h-[794px] mx-auto my-0 p-12 relative font-sans">
        <img
          src="/sertifikat-template.jpg" // <-- Pastikan Anda menaruh gambar template di folder /public
          alt="Sertifikat"
          className="absolute top-0 left-0 w-full h-full -z-10"
        />

        <div className="text-center text-[#07294D]">
          <p className="mt-[210px] text-lg">SERTIFIKAT INI DIBERIKAN KEPADA</p>
          <h1 className="text-6xl font-bold mt-4 tracking-wider">
            {studentName.toUpperCase()}
          </h1>
          <p className="text-lg mt-12">TELAH BERHASIL MENYELESAIKAN KURSUS</p>
          <h2 className="text-4xl font-semibold mt-4">{courseTitle}</h2>
          <p className="text-lg mt-20">
            Sertifikat ini diberikan kepada peserta yang telah menyelesaikan
            kursus online di DiBelajar.in dengan standar pembelajaran yang
            terstruktur, terukur, dan relevan dengan kebutuhan industri.
          </p>
          <p className="mt-12 text-xl font-semibold">{completionDate}</p>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
