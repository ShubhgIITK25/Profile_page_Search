import React from 'react'

const Authbox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-100 max-w-md rounded-2xl border-2 border-slate-900 bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        {children}
      </div>
    </div>
  )
}

export default Authbox
