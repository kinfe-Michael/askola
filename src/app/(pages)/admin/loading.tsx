import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loader() {
  return (
    <div className='p-2 flex bg-gray-100 h-dvh flex-col gap-2'>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
        <Skeleton className='w-96 h-20'/>
    </div>
  )
}

export default Loader