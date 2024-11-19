"use server";
import { connectDB } from "@/lib/db";
import { ProgramData } from "@/lib/types";
import ProgramModel from "@/models/programModel";

export async function getProgramsAction(prevState: number) {
    const db = await connectDB()
    if(!db) return JSON.parse(JSON.stringify({error:'internal problem',nextState:prevState}))
            
  return ProgramModel.find()
    .skip(prevState)
    .limit(5)
    .then((programData:ProgramData[]) => {
        if(programData){
            return JSON.parse(JSON.stringify({programs:programData,nextState:prevState + 5}))
        }
        else {
            return JSON.parse(JSON.stringify({error:'internal problem',nextState:prevState}))
        }
    });
}
