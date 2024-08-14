import React, { useState } from 'react';
import useCommentStore from '../store';
import { isElement } from 'react-dom/test-utils';

const CommentInput = ({ parentId = null, onCancel = () => {} }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error,setError] = useState('');
  const addComment = useCommentStore((state) => state.addComment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !text){
      setError('Please fill out all fields');
      return;
    }
    setError('');

    addComment(name, text, parentId);
    setName('');
    setText('');
    onCancel();
  };

  return (
    <div className="comment-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">POST</button>
        {parentId && <button onClick={onCancel}>Cancel</button>}
      </form>
      {error && <p className="error-message">{error}</p>} {}
    </div>
  );
};

export default CommentInput;
