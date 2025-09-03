import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEnrollmentsByCourse } from '/src/hooks/useAdmin.js';

const InstructorEnrollmentPage = () => {
  const { courseId } = useParams();
  const { data: response, isLoading } = useEnrollmentsByCourse(courseId);

  const enrollments = response?.data?.data || [];
  const courseTitle =
    enrollments.length > 0 ? enrollments[0].courseId?.title : 'Kursus';

  return (
    <>
      <div className="mb-6">
        <Link
          to="/instructor/courses"
          className="text-sm text-primary hover:underline"
        >
          &larr; Kembali ke Kursus Saya
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mt-2">
          Pendaftar di Kursus:{' '}
          <span className="font-normal">{courseTitle}</span>
        </h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Nama Siswa</th>
                <th className="text-left p-3 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? (
                enrollments.map((enroll) => (
                  <tr
                    key={enroll._id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-3">{enroll.userId?.name}</td>
                    <td className="p-3">{enroll.userId?.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-4">
                    Belum ada pendaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default InstructorEnrollmentPage;
