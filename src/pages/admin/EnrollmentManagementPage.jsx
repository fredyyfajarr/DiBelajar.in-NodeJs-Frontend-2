import React, { useState } from 'react';
import { useEnrollments, useDeleteEnrollment } from '/src/hooks/useAdmin.js';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';

const EnrollmentManagementPage = () => {
  const [page, setPage] = useState(1);
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    data: null,
  });

  const { data: response, isLoading } = useEnrollments({ page, limit: 10 });
  const { mutate: deleteEnrollment } = useDeleteEnrollment();

  const enrollments = response?.data?.data || [];
  const totalEnrollments = response?.data?.total || 0;
  const totalPages = Math.ceil(totalEnrollments / 10);

  const openDeleteConfirmation = (enrollmentData) =>
    setConfirmDeleteState({ isOpen: true, data: enrollmentData });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, data: null });

  const handleDelete = () => {
    if (confirmDeleteState.data) {
      const { userId, courseId } = confirmDeleteState.data;
      deleteEnrollment(
        { userId: userId._id, courseId: courseId._id },
        { onSuccess: closeDeleteConfirmation }
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans mb-6">
        Manajemen Pendaftaran
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {isLoading ? (
          <p className="text-center py-4 text-gray-600">
            Memuat pendaftaran...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Nama Pengguna
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Email Pengguna
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Nama Kursus
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <tr
                      key={enrollment._id}
                      className="block md:table-row mb-4 border border-gray-100 rounded-xl shadow-sm md:border-b md:rounded-none md:shadow-none hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Nama:
                        </span>
                        {enrollment.userId?.name || 'Pengguna Dihapus'}
                      </td>
                      <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Email:
                        </span>
                        {enrollment.userId?.email || 'N/A'}
                      </td>
                      <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Kursus:
                        </span>
                        {enrollment.courseId?.title || 'Kursus Dihapus'}
                      </td>
                      <td className="p-3 block md:table-cell text-right md:text-left">
                        <span className="font-semibold md:hidden text-gray-700 float-left">
                          Aksi:
                        </span>
                        <button
                          onClick={() => openDeleteConfirmation(enrollment)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Batalkan Pendaftaran
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-600">
                      Belum ada data pendaftaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
            className="mt-6"
          />
        )}
      </div>
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin membatalkan pendaftaran "${confirmDeleteState.data?.userId?.name}" dari kursus "${confirmDeleteState.data?.courseId?.title}"?`}
      />
    </div>
  );
};

export default EnrollmentManagementPage;
