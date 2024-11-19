import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loader() {
  return (
    <div className='p-2 bg-gray-100 h-dvh flex flex-col gap-2'>
        <Skeleton className='w-96 h-28'/>
        <Skeleton className='w-96 h-56'/>
        <Skeleton className='w-96 h-56'/>
    </div>
  )
}

export default Loader