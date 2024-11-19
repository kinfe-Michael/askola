"use server"
import { connectDB } from "@/lib/db"
import UserModel from "@/models/userModel"

 
export async function getUserAction(id:number){
    
    try {
        const db = await connectDB()
    if(!db) {
      return {user:undefined}
    }
  return  UserModel.find({userId:id}).then(user => {
        return JSON.parse(JSON.stringify({user:user}))
    })
    } catch (error) {
        return {user:undefined}
    }
}