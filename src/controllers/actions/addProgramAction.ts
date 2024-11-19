"use server"
import { connectDB } from "@/lib/db"
import { ProgramData } from "@/lib/types";
import ProgramModel from "@/models/programModel";
import { schemaProgram } from "@/shemas/actionsShema";

export async function addProgramAction(program:ProgramData){
  const validation = schemaProgram.safeParse(program)
  if(validation.error){
    return {error: validation.error.issues}
  }
  const db = await connectDB()
  if(!db) {
    return {error:'Internal error'}
  }
 const newProgram = new ProgramModel(program)
 return newProgram.save().then(() => {
  return {message:'it happened'}
 })

}