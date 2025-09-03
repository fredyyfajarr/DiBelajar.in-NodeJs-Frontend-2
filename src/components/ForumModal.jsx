import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useForumPosts, useCreateForumPost } from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';

// Komponen terpisah untuk satu postingan
const Post = ({ post, onReplyClick, isReplyingToThis }) => {
  const { user } = useAuthStore();
  const isOwnPost = post.userId?._id === user._id;
  const highlightClass = isReplyingToThis
    ? 'ring-2 ring-primary ring-offset-2'
    : '';

  return (
    <div className="flex flex-col">
      <div className={`flex gap-3 ${isOwnPost ? 'justify-end' : ''}`}>
        <div
          className={`p-3 rounded-lg max-w-sm transition-all ${
            isOwnPost ? 'bg-primary text-white' : 'bg-gray-200'
          } ${highlightClass}`}
        >
          <p className="font-bold text-sm">{post.userId?.name || 'User'}</p>
          <p className="whitespace-pre-wrap break-words">{post.text}</p>
          <p className="text-xs opacity-70 mt-1 text-right">
            {new Date(post.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div
        className={`text-xs mt-1 ${
          isOwnPost ? 'text-right mr-2' : 'text-left ml-2'
        }`}
      >
        <button
          onClick={() => onReplyClick(post)}
          className="font-semibold hover:underline"
        >
          Balas
        </button>
      </div>
      {post.replies && post.replies.length > 0 && (
        <div className="pl-8 mt-2 border-l-2 border-gray-200 space-y-3">
          {post.replies.map((reply) => (
            <Post
              key={reply._id}
              post={reply}
              onReplyClick={onReplyClick}
              isReplyingToThis={isReplyingToThis}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Komponen Modal Utama
const ForumModal = ({ isOpen, onClose, courseId, material }) => {
  const { data: response, isLoading } = useForumPosts(courseId, material?._id);

  // --- PERBAIKAN FINAL DI SINI ---
  const posts = response?.data?.data || [];

  const { mutate: createPost, isPending } = useCreateForumPost();
  const { register, handleSubmit, reset, setFocus } = useForm();

  const [replyingTo, setReplyingTo] = useState(null);
  const [parentPost, setParentPost] = useState(null);

  const handleReplyClick = (postToReply) => {
    setReplyingTo(postToReply._id);
    setParentPost(postToReply);
    setFocus('text');
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setParentPost(null);
  };

  const onSubmit = (data) => {
    if (!data.text.trim()) return;
    createPost(
      {
        courseId,
        materialId: material._id,
        postData: { text: data.text, parentPostId: replyingTo },
      },
      {
        onSuccess: () => {
          reset();
          cancelReply();
        },
      }
    );
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (!replyingTo) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posts, replyingTo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-2xl flex flex-col h-[80vh]">
        <h2 className="text-2xl font-bold mb-4 flex-shrink-0">
          Diskusi: {material?.title}
        </h2>

        <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
          {isLoading && <p>Memuat diskusi...</p>}
          {!isLoading && posts.length === 0 && (
            <p className="text-center text-text-muted">
              Jadilah yang pertama memulai diskusi!
            </p>
          )}
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onReplyClick={handleReplyClick}
              isReplyingToThis={post._id === replyingTo}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-shrink-0">
          {replyingTo && parentPost && (
            <div className="text-sm bg-gray-100 p-2 rounded-t-md mb-[-2px]">
              <div className="flex justify-between items-center">
                <span>
                  Membalas kepada <strong>{parentPost.userId?.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={cancelReply}
                  className="font-bold text-lg leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="text-xs text-text-muted mt-1 p-2 bg-gray-200 rounded truncate">
                "{parentPost.text}"
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <textarea
              {...register('text', { required: true })}
              placeholder="Ketik pesan Anda..."
              className="flex-grow border rounded-md p-2"
              rows="2"
            ></textarea>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white font-semibold px-6 rounded-md disabled:opacity-50"
            >
              {isPending ? '...' : replyingTo ? 'Balas' : 'Kirim'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForumModal;
