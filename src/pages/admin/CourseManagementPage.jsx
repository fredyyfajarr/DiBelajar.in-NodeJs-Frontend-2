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

  const { data: response, isLoading } = useAdminCourses({
    page,
    limit: 10,
    keyword: debouncedSearchTerm,
  });
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
  const totalCourses = response?.data?.total || 0;
  const totalPages = Math.ceil(totalCourses / 10);

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-sans">
          Manajemen Kursus
        </h1>
        <button
          onClick={() => handleOpenModal('add')}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-opacity-90 transition-all duration-200"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {isLoading ? (
          <p className="text-center py-4 text-gray-600">Memuat kursus...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Thumbnail
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Judul
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Instruktur
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="block md:table-row mb-4 border border-gray-100 rounded-xl shadow-sm md:border-b md:rounded-none md:shadow-none hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Thumbnail:
                      </span>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-12 w-20 object-cover rounded-lg inline-block"
                      />
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Judul:
                      </span>
                      {course.title}
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left border-b md:border-none">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Instruktur:
                      </span>
                      {course.instructorId?.name || 'N/A'}
                    </td>
                    <td className="p-3 block md:table-cell text-right md:text-left">
                      <span className="font-semibold md:hidden text-gray-700 float-left">
                        Aksi:
                      </span>
                      {user?.role === 'instructor' && (
                        <>
                          <Link
                            to={`/${
                              user?.role === 'admin' ? 'admin' : 'instructor'
                            }/courses/${course.slug || course._id}/enrollments`}
                            className="text-purple-600 hover:underline mr-4 font-medium"
                          >
                            Pendaftar
                          </Link>
                          <Link
                            to={`/${user?.role}/courses/${
                              course.slug || course._id
                            }/analytics`}
                            className="text-yellow-600 hover:underline mr-4 font-medium"
                          >
                            Analitik
                          </Link>
                        </>
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
            className="mt-6"
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
    </div>
  );
};

export default CourseManagementPage;
