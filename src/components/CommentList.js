import React from 'react';
import useCommentStore from '../store';
import Comment from './Comment';

const CommentList = () => {
  const { comments, sortComments } = useCommentStore();

  return (
    <div>
      <div className="sort-buttons">
        <button onClick={() => sortComments('asc')}>Sort Asc</button>
        <button onClick={() => sortComments('desc')}>Sort Desc</button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
