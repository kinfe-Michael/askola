"use server"
import { connectDB } from "@/lib/db";
import { userData } from "@/lib/types";
import UserModel from "@/models/userModel";
export async function addUserAction(userData:userData){

try {
  const db = await connectDB()
  if(!db) return {data:null,message:null,error:'internal error'}
const user = await UserModel.findOne({userId:userData.userId})
if(!user){
  const newUser = new UserModel({
    ...userData,
  })
  await newUser.save()
  return {data:null,message:'user created',error:null}
}
const userStat = {
  lemons:user.lemons,
  role:user.role
}
return {data:userStat,message:'user found',error:null}
} catch (error) {
  return {data:null,message:null,error:'internal error'}
}
}