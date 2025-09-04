// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useUsers, useDeleteUser } from '/src/hooks/useAdmin.js';
import UserFormModal from '/src/components/admin/UserFormModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { useDebounce } from '/src/hooks/useDebounce.js';

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentUser: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    userId: null,
  });

  const { data: response, isLoading } = useUsers({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  const { mutate: deleteUser } = useDeleteUser();

  const users = response?.data?.data || [];
  const totalUsers = response?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / 10);

  const handleOpenModal = (mode, user = null) =>
    setModalState({ isOpen: true, mode, currentUser: user });
  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentUser: null });
  const openDeleteConfirmation = (userId) =>
    setConfirmDeleteState({ isOpen: true, userId });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, userId: null });

  const handleDelete = () => {
    deleteUser(confirmDeleteState.userId, {
      onSuccess: closeDeleteConfirmation,
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans">
          Manajemen Pengguna
        </h1>
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-opacity-90 transition-all duration-200"
        >
          + Tambah Pengguna
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {isLoading ? (
          <p className="text-center py-4 text-gray-600">Memuat pengguna...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Nama
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="block md:table-row mb-4 border border-gray-100 rounded-xl shadow-sm md:border-b md:rounded-none md:shadow-none hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Nama:
                      </span>
                      {user.name}
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Email:
                      </span>
                      {user.email}
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Role:
                      </span>
                      {user.role}
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Aksi:
                      </span>
                      <button
                        onClick={() => handleOpenModal('edit', user)}
                        className="text-blue-600 hover:underline mr-4 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(user._id)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
      <UserFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentUser={modalState.currentUser}
      />
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default UserManagementPage;
