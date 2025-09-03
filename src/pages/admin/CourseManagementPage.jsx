import React, { useState } from 'react';
import { useAdminCourses, useDeleteCourse } from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import { useDebounce } from '/src/hooks/useDebounce.js';
import CourseFormModal from '/src/components/admin/CourseFormModal.jsx';
import Pagination from '/src/components/Pagination.jsx';
import ConfirmationModal from '/src/components/ConfirmationModal.jsx';
import { Link } from 'react-router-dom';

const CourseManagementPage = () => {
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // --- LOGIKA BARU UNTUK MEMILIH HOOK ---
  // Tentukan hook mana yang akan digunakan berdasarkan peran pengguna
  const { data: response, isLoading } = useAdminCourses({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
  // --- AKHIR LOGIKA BARU ---

  const { mutate: deleteCourse } = useDeleteCourse();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    currentCourse: null,
  });
  const [confirmDeleteState, setConfirmDeleteState] = useState({
    isOpen: false,
    courseId: null,
  });

  const courses = response?.data?.data || [];
  const totalCourses = response?.data?.total || response?.data?.count || 0;
  const totalPages = Math.ceil(totalCourses / 10);

  // Handlers (tidak ada perubahan)
  const handleOpenModal = (mode, course = null) =>
    setModalState({ isOpen: true, mode, currentCourse: course });
  const handleCloseModal = () =>
    setModalState({ isOpen: false, mode: null, currentCourse: null });
  const openDeleteConfirmation = (courseId) =>
    setConfirmDeleteState({ isOpen: true, courseId });
  const closeDeleteConfirmation = () =>
    setConfirmDeleteState({ isOpen: false, courseId: null });
  const handleDelete = () => {
    deleteCourse(confirmDeleteState.courseId, {
      onSuccess: closeDeleteConfirmation,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary">
          Manajemen Kursus
        </h1>
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:opacity-90"
        >
          + Tambah Kursus
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan judul atau deskripsi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-md"
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-center p-4">Loading courses...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Thumbnail</th>
                  <th className="text-left p-3 font-semibold">Judul</th>
                  <th className="text-left p-3 font-semibold">Instruktur</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-10 w-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 font-medium">{course.title}</td>
                    <td className="p-3">
                      {course.instructorId?.name || 'N/A'}
                    </td>
                    <td className="p-3">
                      {user?.role === 'instructor' && (
                        <Link
                          to={`/instructor/courses/${
                            course.slug || course._id
                          }/enrollments`}
                          className="text-purple-600 hover:underline mr-4 font-medium"
                        >
                          Pendaftar
                        </Link>
                      )}
                      <Link
                        to={`/${
                          user?.role === 'admin' ? 'admin' : 'instructor'
                        }/courses/${course.slug || course._id}/materials`}
                        className="text-green-600 hover:underline mr-4 font-medium"
                      >
                        Materi
                      </Link>
                      <button
                        onClick={() => handleOpenModal('edit', course)}
                        className="text-blue-600 hover:underline mr-4 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(course._id)}
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

      <CourseFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        currentCourse={modalState.currentCourse}
      />
      <ConfirmationModal
        isOpen={confirmDeleteState.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus kursus ini? Semua materi terkait akan ikut terhapus."
      />
    </>
  );
};

export default CourseManagementPage;
