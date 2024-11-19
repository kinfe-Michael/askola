"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { addTaskAction } from "@/controllers/actions/addTaskAction"
import { TaskData } from "@/lib/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

function AddTaskPage() {
    const [linkType,setLinkType]= useState<'direct' | 'share'>('direct')
    const {register,handleSubmit,reset} = useForm()
    const onSubmit= handleSubmit(async (data)=> {
        const taskData:TaskData = {
            taskName:data.taskName,
            secondaryInfo:data.secondaryInfo,
            link:data.link,
            linkType:linkType,
            actionText:data.actionText,
        }
        const res = await addTaskAction(taskData)
        if(res.error){
            toast.error('somthing went wrong')
            return
        }
        toast.success('Task Added')
        reset()
    })
    const lableStyle = `text-sm mt-4 indent-4`
  return (
    <form onSubmit={onSubmit} className="p-2 flex gap-2 flex-col">
        <p className='font-medium self-center'>Add Program</p>

        <hr className="m-2 w-full" />

        <label className={lableStyle} htmlFor="task">Task</label>
        <Input required {...register('taskName')} className="" id="task" placeholder="E.g Follow on IG"/>

        <label className={lableStyle} htmlFor="SecondaryInfo">Secondary Info</label>
        <Input {...register('secondaryInfo')} id="SecondaryInfo" placeholder="E.g +1000"/>
       
        <label className={lableStyle} htmlFor="actionText">Action Text</label>
        <Input required {...register('actionText')} id="actionText" placeholder="Action Text"/>
       
        <label className={lableStyle} htmlFor="link">Link</label>
        <Input required {...register('link')} id="link" placeholder="Link"/>

        <Select  onValueChange={(value)=> {
            if(value !== 'direct' && value !== 'share') return
            setLinkType(value)
        }} >
            <SelectTrigger>
                Link Type
            </SelectTrigger>
            <SelectContent >
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="share">Share</SelectItem>
            </SelectContent>
        </Select>

        <Button className="bg-green-400 m-4 text-white">Add Task</Button>
    </form>
  )
}

export default AddTaskPage