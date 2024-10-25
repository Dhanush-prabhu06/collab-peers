import React from 'react'

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404 ERROR</h1>
      <p className="mt-4 text-lg text-gray-600">This page doesnot exist</p>
      <a 
        href="/" 
        className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        Go back
      </a>
    </div>
  </div>
  )
}

export default Error;