import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMaterials, useDeleteMaterial } from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import MaterialFormModal from '/src/components/admin/MaterialFormModal.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';

const MaterialManagementPage = () => {
  const { courseId } = useParams();
  const { user } = useAuthStore(); // Mengambil info user yang login

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentMaterial: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    materialId: null,
  });

  const { data: response, isLoading } = useMaterials(courseId);
  const { mutate: deleteMaterial } = useDeleteMaterial();

  const materials = response?.data?.data || [];
  const courseTitle =
    materials.length > 0
      ? materials[0].courseId?.title
      : 'Memuat Nama Kursus...';

  // Tentukan path dasar dinamis berdasarkan role user
  const basePath =
    user?.role === 'admin' ? '/admin/courses' : '/instructor/courses';

  // Handlers untuk modal
  const handleOpenModal = (mode, material = null) =>
    setModalState({ isOpen: true, mode, currentMaterial: material });

  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentMaterial: null });

  const openDeleteConfirmation = (materialId) =>
    setConfirmDeleteState({ isOpen: true, materialId });

  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, materialId: null });

  const handleDelete = () => {
    deleteMaterial(
      { courseId, materialId: confirmDeleteState.materialId },
      {
        onSuccess: closeDeleteConfirmation,
      }
    );
  };

  return (
    <>
      <div className="mb-6">
        {/* Menggunakan basePath dinamis untuk link "Kembali" */}
        <Link to={basePath} className="text-sm text-primary hover:underline">
          &larr; Kembali ke Daftar Kursus
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mt-2">
          Manajemen Materi: <span className="font-normal">{courseTitle}</span>
        </h1>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:opacity-90"
        >
          + Tambah Materi
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-center p-4">Memuat materi...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Judul Materi</th>
                  <th className="text-left p-3 font-semibold">Deskripsi</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {materials.length > 0 ? (
                  materials.map((material) => (
                    <tr
                      key={material._id}
                      className="border-b border-border last:border-0 hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">{material.title}</td>
                      <td className="p-3 text-sm text-text-muted">
                        {material.description.substring(0, 70)}...
                      </td>
                      <td className="p-3">
                        {/* Tautan "Detail" dinamis berdasarkan basePath */}
                        <Link
                          to={`${basePath}/${courseId}/materials/${
                            material.slug || material._id
                          }`}
                          className="text-green-600 hover:underline mr-4 font-medium"
                        >
                          Detail
                        </Link>
                        <button
                          onClick={() => handleOpenModal('edit', material)}
                          className="text-blue-600 hover:underline mr-4 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(material._id)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-text-muted">
                      Belum ada materi untuk kursus ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Komponen Modal untuk Tambah/Edit Materi */}
      <MaterialFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentMaterial={modalState.currentMaterial}
        courseId={courseId}
      />

      {/* Komponen Modal untuk Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus materi ini?"
      />
    </>
  );
};

export default MaterialManagementPage;
