"use client"

import React from 'react'

const error = ({error, reset}) => {
  return (
    <div className="text-center text-red-500">
      <h2 className="text-xl font-bold">Account No Longer Exists</h2>
      <p>We're sorry, but the account you're trying to access no longer exists.</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Reset</button>
    </div>
      
  )
}

export default error
