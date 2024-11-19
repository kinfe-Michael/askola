"use server"

import { connectDB } from "@/lib/db"
import { TaskData } from "@/lib/types"
import TaskModel from "@/models/taskModel"

export async function getTaskAction(){
    try {
        const db = await connectDB()
        if(!db) return JSON.parse(JSON.stringify({tasks:null}))

        return TaskModel.find().then(taskData => {
            const tasks:TaskData[] = [...taskData]
            return JSON.parse(JSON.stringify({tasks:tasks}))
        })
    } catch (error) {
        return JSON.parse(JSON.stringify({tasks:null}))
    }
}