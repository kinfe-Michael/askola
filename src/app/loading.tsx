import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div className=' flex gap-2 bg-gray-100 h-dvh flex-col'>
        <Skeleton className='w-full h-2/5'/>
        <Skeleton className='w-full h-2/5'/>
    </div>
  )
}

export default Loading