"use server"

import { connectDB } from "@/lib/db"
import { courseData } from "@/lib/types"
import CourseModel from "@/models/coursesModel"

export async function getCoursesAction(){
 
        const db = await connectDB()
        if(db){
           return CourseModel.find().then(courses => {
                if(!courses) throw new Error('internal error')
                
                return courses
            }).catch(() => {
                return
            })
        }
     
  
   
}