"use server"

import { connectDB } from "@/lib/db"
import QuestionModel from "@/models/questionModel"

export async function addQuestionAction(formData:any){
    const question = formData.question
    const subject = formData.subject
    const university = formData.university
    const year = formData.year
    const answer = formData.answer
    const a = formData.a
    const b = formData.b
    const c = formData.c
    const d = formData.d
    const e = formData.e
    const f = formData.f
    let dataToAdd 
    if(question === '' || subject === ''){
      return {error:"Fill the required inputs"}
    }
    dataToAdd ={
      question:question,
      subject:subject,
      examType:formData.examType || 'unknown',
    }
    let choices:string[] = []
    const choiceData = [a,b,c,d,e,f].map(choice => {
      if(choice !== '') choices.push(choice)
    })
    if(answer !== '') {
      dataToAdd = {
         ...dataToAdd,
         answer:answer
      }
    }
    if(choices.length > 2){
      dataToAdd = {
         ...dataToAdd,
         choices:choices,
         university: university !== ''? university.toUpperCase() : 'all',
         year: year !== ''? year : 'all',
      }
    }
    try {
      const db = await connectDB()
     const newQuestion = new QuestionModel(dataToAdd)
     const res =await newQuestion.save()
     return {success:'successful'}
    } catch (error) {
      return {error:"Internal error"}
    }
}