'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import FullPrompt from './Fullprompt';
import Link from 'next/link'
import axios from 'axios'
import SessionData from '@app/api/getSession/SessionData';
import { useRouter } from 'next/navigation';

const PromptCard = ({prompt, handleTagClick, isCurrentUser, isProfileData}) => {
  console.log(prompt);
  
  const [copied, setCopied] = useState(false);
  const [displayFullPrompt, setDisplayFullPrompt] = useState({});
  const session = SessionData();
  const router = useRouter();
  console.log(session);
  


  //handle the copy to clipboard functionality
  const handleCopy = (event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    const button = event.currentTarget;
    console.log(button);
    
    button.setAttribute('title', 'Copied!');
    
    setTimeout(() => {
      setCopied(false);
      button.setAttribute('title', 'Copy');
    }, 3000);
  };

  //handleEdit function
  const handleEdit = (promptId) =>{
    router.push(`/update-prompt?id=${promptId}`)
  }

  //handleDelete function
  const handleDelete = async (promptId) =>{
    await axios.delete(`/api/prompt/${promptId}`)
  }
  
  return (
    <>
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-filter md:w-[360px] w-full h-fit transition-all duration-200 hover:shadow-lg hover:scale-[1.02]'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
            <Link
            href={`/users/profile/${prompt?.creator?._id}`}
            >
              <Image
                src={prompt.creator?.image || '/assets/delete-user-icon.png'}
                alt={prompt.creator ? 'user_image' : 'deleted_account'}
                width={40}
                height={40}
                className='rounded-full object-contain bg-gray-500'
              />
            </Link>
            <div className='flex flex-col'>
              <Link
              href={`/users/profile/${prompt.creator?._id}`}
              >
                <div
                className='flex items-center justify-between'>
                  <h3 className='font-satoshi font-semibold text-gray-900'>
                    {prompt.creator?.username || 'Deleted User'}
                  </h3>
                </div>
              </Link>
              <p className='font-inter text-sm text-gray-500'>
                {prompt.creator?.email || 'Deleted User'}
              </p>
            </div>
          </div>
          <button 
          title='Copy'
          className="text-gray-500 copyButton relative hover:text-gray-700 w-[30px] h-[30px] bg-gray-300 rounded-full flex items-center justify-center"
            onClick={(event) => handleCopy(event)}
          >
            {copied ? <AiOutlineCheck/> : <AiOutlineCopy/>}
          </button>
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700 line-clamp-5'
         onClick={() => setDisplayFullPrompt(prompt.prompt && prompt)}>
        {prompt.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
         onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
        <div className="flex justify-between items-center">
          <span>{prompt.tag}</span>
          <div className="flex gap-3">
            <button className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700"
              onClick={() => setDisplayFullPrompt(prompt.prompt && prompt)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </p>
    {isCurrentUser && (
      <div className="flex justify-between items-center mt-4">
        <button 
          className="bg-neonSecondary hover:bg-neonTertiary text-white font-bold py-2 px-4 rounded"
          onClick={() => handleEdit(prompt._id)}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(prompt._id)}
        >
          Delete
        </button>
      </div>
    )}
    </div>
      
      {displayFullPrompt.prompt && 
      <FullPrompt 
        promptData={displayFullPrompt} 
        setDisplayFullPrompt={setDisplayFullPrompt}
      />}
    </>
  )
}

export default PromptCard;
