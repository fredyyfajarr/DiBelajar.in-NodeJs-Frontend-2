/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useUsers, useDeleteUser } from '/src/hooks/useAdmin.js';
import UserFormModal from '/src/components/admin/UserFormModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';

// Hook untuk debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const UserManagementPage = () => {
  // State management
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce 500ms

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentUser: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    userId: null,
  });

  // Data fetching
  const { data: response, isLoading } = useUsers({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  const { mutate: deleteUser } = useDeleteUser();

  const users = response?.data?.data || [];
  const pagination = response?.data?.pagination || {};
  const totalUsers = response?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / 10);

  // Handlers
  const handleOpenModal = (mode, user = null) => {
    setModalState({ isOpen: true, mode, currentUser: user });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: null, currentUser: null });
  };

  const openDeleteConfirmation = (userId) => {
    setConfirmDeleteState({ isOpen: true, userId });
  };

  const closeDeleteConfirmation = () => {
    setConfirmDeleteState({ isOpen: false, userId: null });
  };

  const handleDelete = () => {
    deleteUser(confirmDeleteState.userId, {
      onSuccess: () => {
        closeDeleteConfirmation();
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary">
          Manajemen Pengguna
        </h1>
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:opacity-90"
        >
          + Tambah Pengguna
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-md"
        />
      </div>

      {/* Tabel Pengguna */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-center p-4">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Nama</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Role</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
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
          />
        )}
      </div>

      {/* Modals */}
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
    </>
  );
};

export default UserManagementPage;
