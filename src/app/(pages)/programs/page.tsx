"use client"
import { getProgramsAction } from '@/controllers/actions/getProgramsAction';
import { ProgramData } from '@/lib/types';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '../../../components/ui/table'
import { Button } from '@/components/ui/button';
function ProgramsPage() {
    const [programs,setPrograms] = useState<ProgramData[] | any[]>([])
    const [hasNextPage,setHasnextPage] = useState(true)
    const [skipParam,setSkipParam] = useState(0)
    async function getPrograms(){
         const res = await getProgramsAction(skipParam)
         if(res?.error){
            toast.error(res.error)
         }else {
            const newList:ProgramData[] = [...programs,...res.programs]
            setPrograms(newList)
           
         }
         setSkipParam(res?.nextState)
         if(res?.programs.length < 5) setHasnextPage(false)
    }
    const { ref } = useInView({
        threshold: 0.2,
        onChange: (inView) => {
          inView && hasNextPage && getPrograms()
        },
      });
  return (
    <div className='flex flex-col bg-gray-100 '>
        {
            programs?.map((program:ProgramData,i:number) => {
                return <div className='min-h-56  font-sans flex mt-2 flex-col border bg-white p-4' key={i}>
                    <div className="flex capitalize gap-2 items-end justify-between">
                    <p className='text-xl capitalize font-medium'>{program?.collage}</p>

                      <p className='text-lg '>{program?.country}</p>
                    </div>
                    <hr className='m-2' />
                    <p>{program?.description}</p>
                    <Table className='capitalize'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Deadline</TableCell>
                          <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Coverage</TableCell>
                          <TableCell>{program?.coverage}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Level</TableCell>
                          <TableCell>{program?.level}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <a href="tosomeplace" className='self-end px-4 py-2 rounded-md bg-slate-100' >Official link</a>
                </div>
            })
        }
    <div ref={ref}></div>
    </div>
  )
}

export default ProgramsPage