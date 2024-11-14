import React from 'react'
import Image from 'next/image'

const PromptCard = ({prompt, handleTagClick}) => {
  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {prompt.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt.creator.email}
            </p>
          </div>
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
         onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>
    </div>
  )
}

export default PromptCard;
