import React from 'react'

const VideoTitle = ({overview, title}) => {
  return (
    <div className='w-screen aspect-video pt-96 px-12 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-5xl font-bold'>{title}</h1>
        <p className='w-1/4 py-6 text-lg'>{overview}</p>
        <div>
            <button className='p-3 px-12 bg-white rounded-md text-black text-xl hover:opacity-60'>Play</button>
            <button className='mx-2 p-3 px-12 bg-slate-600 rounded-md text-white text-xl hover:opacity-60'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle



