"use server"
import { connectDB } from "@/lib/db";
import { TaskData } from "@/lib/types";
import TaskModel from "@/models/taskModel";
import { shemaTask } from "@/shemas/actionsShema";

export async function addTaskAction(taskData:TaskData){
    const validation = shemaTask.safeParse(taskData)
    if(validation.error) return {error:true}
try {
  const db = await connectDB()
  if(!db) return {error:true}
  const newTask = new TaskModel(taskData)
 return newTask.save().then(()=>{
    return {error:false}
  })
} catch (error) {
  return {error:true}
}
}