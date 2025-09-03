import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useSubmissions,
  useTestResults,
  useForumPosts,
  useMaterialDetail,
} from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import ForumModal from '/src/components/ForumModal.jsx';

// Komponen-komponen List (SubmissionsList, TestResultsList, ForumPostsList) tidak diubah
const SubmissionsList = ({ data, isLoading }) => {
  if (isLoading) return <p>Memuat daftar tugas...</p>;
  const submissions = data?.data || [];
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3 font-semibold">Nama Siswa</th>
          <th className="text-left p-3 font-semibold">Waktu Submit</th>
          <th className="text-left p-3 font-semibold">File</th>
        </tr>
      </thead>
      <tbody>
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <tr
              key={sub._id}
              className="border-b last:border-0 hover:bg-gray-50"
            >
              <td className="p-3">{sub.userId?.name || 'N/A'}</td>
              <td className="p-3">
                {new Date(sub.submittedAt).toLocaleString()}
              </td>
              <td className="p-3">
                <a
                  href={sub.submissionFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Lihat File
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-4 text-text-muted">
              Belum ada tugas yang dikumpulkan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
const TestResultsList = ({ data, isLoading }) => {
  if (isLoading) return <p>Memuat hasil tes...</p>;
  const results = data?.data || [];
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3 font-semibold">Nama Siswa</th>
          <th className="text-left p-3 font-semibold">Skor</th>
          <th className="text-left p-3 font-semibold">Waktu Selesai</th>
        </tr>
      </thead>
      <tbody>
        {results.length > 0 ? (
          results.map((res) => (
            <tr
              key={res._id}
              className="border-b last:border-0 hover:bg-gray-50"
            >
              <td className="p-3">{res.userId?.name || 'N/A'}</td>
              <td className="p-3 font-bold">{res.score}</td>
              <td className="p-3">
                {new Date(res.completeAt).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-4 text-text-muted">
              Belum ada hasil tes.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
const ForumPostsList = ({ data, isLoading }) => {
  if (isLoading) return <p>Memuat riwayat diskusi...</p>;
  const posts = data?.data?.data || [];
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-md bg-gray-50">
            <p className="font-semibold text-text-primary">
              {post.userId?.name || 'N/A'}
            </p>
            <p className="text-sm text-text-muted mb-2">
              {new Date(post.timestamp).toLocaleString()}
            </p>
            <p className="text-text-primary">{post.text}</p>
          </div>
        ))
      ) : (
        <p className="text-center p-4 text-text-muted">
          Belum ada riwayat diskusi.
        </p>
      )}
    </div>
  );
};

// Komponen Halaman Utama
const MaterialDetailPage = () => {
  const { courseId, materialId } = useParams();
  const [activeTab, setActiveTab] = useState('submissions');
  const [isForumOpen, setForumOpen] = useState(false);
  const { user } = useAuthStore();
  const basePath = user?.role === 'admin' ? '/admin' : '/instructor';

  const { data: materialDetail, isLoading: isLoadingMaterial } =
    useMaterialDetail(courseId, materialId);
  const { data: submissionsData, isLoading: submissionsLoading } =
    useSubmissions(courseId, materialId);
  const { data: testResultsData, isLoading: testResultsLoading } =
    useTestResults(courseId, materialId);
  const { data: forumPostsData, isLoading: forumPostsLoading } = useForumPosts(
    courseId,
    materialId
  );

  const TABS = {
    submissions: (
      <SubmissionsList data={submissionsData} isLoading={submissionsLoading} />
    ),
    testResults: (
      <TestResultsList data={testResultsData} isLoading={testResultsLoading} />
    ),
    forumPosts: (
      <ForumPostsList data={forumPostsData} isLoading={forumPostsLoading} />
    ),
  };

  // Tampilkan loading state utama jika detail materi belum ada
  if (isLoadingMaterial) {
    return <div className="p-8">Memuat detail materi...</div>;
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Link
              to={`${basePath}/courses/${courseId}/materials`}
              className="text-sm text-primary hover:underline"
            >
              &larr; Kembali ke Daftar Materi
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mt-2">
              Detail Materi:{' '}
              <span className="font-normal">
                {materialDetail?.title || '...'}
              </span>
            </h1>
          </div>
          {/* Tombol "Ikut Diskusi" hanya ditampilkan jika detail materi sudah ada */}
          {materialDetail && (
            <button
              onClick={() => setForumOpen(true)}
              className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700"
            >
              Ikut Diskusi
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-border mb-4">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'submissions'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:border-gray-300'
            }`}
          >
            Tugas Terkumpul
          </button>
          <button
            onClick={() => setActiveTab('testResults')}
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'testResults'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:border-gray-300'
            }`}
          >
            Hasil Tes
          </button>
          <button
            onClick={() => setActiveTab('forumPosts')}
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'forumPosts'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:border-gray-300'
            }`}
          >
            Riwayat Diskusi
          </button>
        </nav>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md min-h-[200px]">
        {TABS[activeTab]}
      </div>

      {/* Modal Forum hanya dirender jika detail materi sudah ada */}
      {materialDetail && (
        <ForumModal
          isOpen={isForumOpen}
          onClose={() => setForumOpen(false)}
          courseId={courseId}
          material={materialDetail?.data}
        />
      )}
    </>
  );
};

export default MaterialDetailPage;
