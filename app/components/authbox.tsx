import React from 'react'

const Authbox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-100 max-w-md bg-white p-8 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  )
}

export default Authbox
