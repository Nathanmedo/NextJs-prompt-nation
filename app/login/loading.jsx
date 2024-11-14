'use client'
import { FadeLoader } from 'react-spinners'

import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <FadeLoader color='#333333' size={30} />
    </div>
  )
}

export default Loading;