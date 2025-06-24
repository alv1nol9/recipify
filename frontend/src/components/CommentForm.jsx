import { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAddComment(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: '8px' }}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
