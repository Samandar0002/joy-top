import React, { useState } from "react";

const CommentSection = () => {
    // Assuming you have a state to hold the comment text
    const [comment, setComment] = useState('');
  
    const handleCommentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setComment(e.target.value);
    };
  
    const handleSubmit = () => {
    
      console.log(comment);
    };
  
    return (
      <div className="my-4 mx-2 p-4">
        <h3 className="text-lg mb-2">Leave a comment</h3>
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Your comment..."
            value={comment}
            onChange={handleCommentChange}
           />
          <button
            className="bg-orange-500 text-white rounded px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Jo'natish
          </button>
        </div>
      </div>
    );
  };
  
  export default CommentSection