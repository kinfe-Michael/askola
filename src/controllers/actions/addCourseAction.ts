"use server"
import { connectDB } from "@/lib/db"
import { CourseData } from "@/lib/types";
import CourseModel from "@/models/coursesModel";
import { schemaCourse } from "@/shemas/actionsShema";

export async function addCourseAction(course:CourseData){
  const validation = schemaCourse.safeParse(course)
  if(validation.error){
    return {error: validation.error.issues}
  }
  const db = await connectDB()
  if(!db) {
    return {error:'Internal error'}
  }
 const newCourse = new CourseModel(course)
 return newCourse.save().then(() => {
  return {message:'it happened'}
 })

}