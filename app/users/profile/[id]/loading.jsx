import React from 'react'
import { FadeLoader } from 'react-spinners'
const loading = () => {
  return (
    <>
    <div className='h-screen flex justify-center items-center'>
      <FadeLoader color='#333333' size={30} />
    </div>
    </>
  )
}

export default loading
