import React from 'react'
import Hero from './homePageComponents/hero'
import Image from 'next/image'

function SplashScreen() {
  return (
    <div className='min-h-dvh flex items-center justify-center bg-white '>
       <Image className='w-full h-auto' alt='Lomi Learn' src='/splash.jpg' width={400}  height={800} />
    </div>
  )
}

export default SplashScreen