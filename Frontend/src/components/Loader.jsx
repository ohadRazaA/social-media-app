import React from 'react'

function Loader() {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <span className="loading loading-spinner loading-lg mx-auto"></span>
    </div>
  )
}

export default Loader
