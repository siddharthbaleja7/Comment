import React from 'react';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import './App.css';

function App() {
    return (
        <div className="comment-section">
            <h2>Comments</h2>
            <CommentInput />
            <CommentList />
        </div>
    );
}

export default App;
