import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div className='p-2 gap-2 bg-white min-h-dvh flex flex-col'>
        <Skeleton className='w-full h-56'/>
        <Skeleton className='w-full flex-grow '/>
    </div>
  )
}

export default Loading