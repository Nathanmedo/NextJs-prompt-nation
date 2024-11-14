import React from 'react'
import Image from 'next/image';


const FullPrompt = ({promptData, setDisplayFullPrompt}) => {

  console.log(promptData);

  
  return (
    <div>
      {promptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold line-clamp-1">Prompt related to {promptData.tag}</h2>
              <button 
                onClick={() => setDisplayFullPrompt({})}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Prompt content */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={promptData.creator?.image || '/assets/delete-user-icon.png'}
                  alt="user avatar"
                  className="rounded-full"
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="font-bold">{promptData.creator?.username || 'Deleted User'}</h3>
                  <p className="text-gray-500 text-sm">{promptData.creator?.email || 'Deleted User'}</p>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{promptData.prompt}</p>
              <div className="mt-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {promptData.tag}
                </span>
              </div>
            </div>

            {/* Comments section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Comments</h3>
              
              {/* Comment input */}
              <div className="mb-6">
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  placeholder="Add a comment..."
                  rows="3"
                />
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Post Comment
                </button>
              </div>

              {/* Comments list */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {/* Show when no comments */}
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
                
                {/* This will be mapped through when we have comments */}
                {/* {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={comment.userImage} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-semibold">{comment.username}</p>
                        <p className="text-gray-500 text-sm">{comment.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FullPrompt;
