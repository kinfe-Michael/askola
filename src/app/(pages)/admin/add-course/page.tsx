"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addCourseAction } from '@/controllers/actions/addCourseAction'
import { addQuestionAction } from '@/controllers/actions/addQuestionAction'
import { CourseData } from '@/lib/types'
import React from 'react'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
function AddCoursePage() {
    const {register,handleSubmit,reset} = useForm()
    const onSubmit = handleSubmit(async (data) => {
        const course:CourseData = {
            name:data.name,
            courseCode:data.courseCode
        }
      const res = await addCourseAction(course)
      if(res?.error){
        toast.error('res.error')
        return
      }else {
        toast.success('res.success')
        reset()
      }
    
    })
  return (
    <div className='p-2 mt-6 flex flex-col gap-2 '>
        <p className='text-xs'>Add Course</p>
        <form
        onSubmit={onSubmit}
        className='flex flex-col gap-2'
        >
            
            <Input  required {...register('name')} placeholder='Course title' />
            <Input required {...register('courseCode')} placeholder='Course Code' />
            <Button className="bg-green-400 text-white text-lg font-extrabold">
          Submit
        </Button>
        </form>
    </div>
  )
}

export default AddCoursePage