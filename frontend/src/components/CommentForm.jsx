import { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-lg border border-purple-200"
    >
      <textarea
        className="w-full p-3 border border-pink-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        rows={4}
        placeholder="Share your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={text.trim() === ''}
          className={`px-5 py-2 rounded-xl font-semibold transition shadow-md ${
            text.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-500 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
