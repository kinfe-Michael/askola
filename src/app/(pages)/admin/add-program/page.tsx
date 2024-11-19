"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { addProgramAction } from '@/controllers/actions/addProgramAction'
import { ProgramData } from '@/lib/types'
import React from 'react'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
function AddCoursePage() {
    const {register,handleSubmit,reset} = useForm()
    const onSubmit = handleSubmit(async (data) => {
        const program:ProgramData = {
            country:data.country,
            collage:data.collage,
            description:data.description,
            level:data.level,
            deadline:data.deadline,
            coverage:data.coverage,
            officialLink:data.officialLink,

        }
      const res = await addProgramAction(program)
      if(res?.error){
        toast.error('res.error')
        return
      }else {
        toast.success('res.success')
        reset()
      }
    
    })
  return (
    <div className='p-2  bg-gray-100 flex flex-col gap-2 '>
        <p className='font-medium self-center'>Add Program</p>
        <hr />
        <form
        onSubmit={onSubmit}
        className='flex flex-col gap-2'
        >
            <p className='text-sm ml-4 font-medium mt-2'>Info</p>
            <Input  required {...register('country')} placeholder='Country' />
            <Input required {...register('collage')} placeholder='Collage' />
            <Textarea required {...register('description')} placeholder='Description' />
            <p className='text-sm ml-4 font-medium  mt-2'>Table info</p>
             
            <Input required {...register('deadline')} placeholder='Deadline' />
            <Input required {...register('coverage')} placeholder='Coverage' />
            <Input required {...register('level')} placeholder='Level' />
            <p className='text-sm ml-4 font-medium  mt-2'>Adress</p>
            
            <Input required {...register('officialLink')} placeholder='Official link' />
            <Button className="bg-green-400 text-white text-lg font-extrabold">
          Submit
        </Button>
        </form>
    </div>
  )
}

export default AddCoursePage