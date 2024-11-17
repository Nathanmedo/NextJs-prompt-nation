'use client' // Error components must be Client Components
import Link from 'next/link';


const Error = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-gray-600 text-lg mb-6">
        Something went wrong while loading the page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-neonSecondary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default Error