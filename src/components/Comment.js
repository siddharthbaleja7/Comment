import React, { useState } from 'react';
import useCommentStore from '../store';
import CommentInput from './CommentInput';

const Comment = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const editComment = useCommentStore((state) => state.editComment);
  const deleteComment = useCommentStore((state) => state.deleteComment);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText) {
      editComment(comment.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="comment">
      <strong>{comment.name}</strong>
      <small>{new Date(comment.date).toLocaleString()}</small>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        {!isEditing && (
          <>
          {!comment.parentId && (

            <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
          )}
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </>
        )}
      </div>
      {isReplying && (
        <CommentInput
          parentId={comment.id}
          onCancel={() => setIsReplying(false)}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="reply">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
