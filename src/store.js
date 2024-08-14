import create from 'zustand';

const useCommentStore = create((set) => ({
  comments: JSON.parse(localStorage.getItem('comments')) || [], // Load from localStorage

  addComment: (name, text, parentId = null) =>
    set((state) => {
      const newComment = {
        id: Date.now(),
        name,
        text,
        date: new Date(),
        parentId,
        replies: [],
      };
      const updatedComments = parentId === null
        ? [...state.comments, newComment]
        : state.comments.map((comment) => {
            if (comment.id === parentId) {
              return { ...comment, replies: [...comment.replies, newComment] };
            }
            return comment;
          });

      localStorage.setItem('comments', JSON.stringify(updatedComments)); // Save to localStorage

      return { comments: updatedComments };
    }),

  editComment: (id, newText) =>
    set((state) => {
      const updateText = (comment) => {
        if (comment.id === id) {
          return { ...comment, text: newText };
        }
        if (comment.replies.length > 0) {
          comment.replies = comment.replies.map(updateText);
        }
        return comment;
      };
      const updatedComments = state.comments.map(updateText);
      
      localStorage.setItem('comments', JSON.stringify(updatedComments)); // Save to localStorage

      return { comments: updatedComments };
    }),

  deleteComment: (id) =>
    set((state) => {
      const removeComment = (comments) =>
        comments.filter((comment) => {
          if (comment.id === id) {
            return false;
          }
          if (comment.replies.length > 0) {
            comment.replies = removeComment(comment.replies);
          }
          return true;
        });

      const updatedComments = removeComment(state.comments);
      
      localStorage.setItem('comments', JSON.stringify(updatedComments)); // Save to localStorage

      return { comments: updatedComments };
    }),

  sortComments: (order) =>
    set((state) => {
      const sortFunction = (a, b) => {
        if (order === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      };
      
      const sortedComments = [...state.comments].sort(sortFunction);
      
      localStorage.setItem('comments', JSON.stringify(sortedComments)); // Save to localStorage
      
      return { comments: sortedComments };
    }),
}));

export default useCommentStore;
