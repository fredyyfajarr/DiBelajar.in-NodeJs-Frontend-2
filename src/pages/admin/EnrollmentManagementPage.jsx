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

  const openDeleteConfirmation = (enrollmentData) => {
    setConfirmDeleteState({ isOpen: true, data: enrollmentData });
  };

  const closeDeleteConfirmation = () => {
    setConfirmDeleteState({ isOpen: false, data: null });
  };

  const handleDelete = () => {
    if (confirmDeleteState.data) {
      const { userId, courseId } = confirmDeleteState.data;
      deleteEnrollment(
        { userId: userId._id, courseId: courseId._id },
        {
          onSuccess: closeDeleteConfirmation,
        }
      );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Manajemen Pendaftaran
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-center p-4">Loading enrollments...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Nama Pengguna</th>
                  <th className="text-left p-3 font-semibold">
                    Email Pengguna
                  </th>
                  <th className="text-left p-3 font-semibold">Nama Kursus</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <tr
                      key={enrollment._id}
                      className="border-b border-border last:border-0 hover:bg-gray-50"
                    >
                      <td className="p-3">
                        {enrollment.userId?.name || 'Pengguna Dihapus'}
                      </td>
                      <td className="p-3">
                        {enrollment.userId?.email || 'N/A'}
                      </td>
                      <td className="p-3 font-medium">
                        {enrollment.courseId?.title || 'Kursus Dihapus'}
                      </td>
                      <td className="p-3">
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
                    <td colSpan="4" className="text-center p-4 text-text-muted">
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
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin membatalkan pendaftaran "${confirmDeleteState.data?.userId?.name}" dari kursus "${confirmDeleteState.data?.courseId?.title}"?`}
      />
    </>
  );
};

export default EnrollmentManagementPage;
