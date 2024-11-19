import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loader() {
  return (
    <div className='p-2 min-h-dvh bg-gray-100 flex flex-col gap-2'>
        <Skeleton className='w-96  h-28'/>
        <Skeleton className='w-96 h-56'/>
        <Skeleton className='w-96 h-56'/>
    </div>
  )
}

export default Loader