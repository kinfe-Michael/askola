"use server"

import { connectDB } from "@/lib/db"
import { statsData } from "@/lib/types"
import UserModel from "@/models/userModel"

export async function reportsAction(){
    let statData:statsData
    const date = new Date()
  const yesterday =  date.setDate(date.getDate() - 1)

  const aWeakBefore =  date.setDate(date.getDate() - 6)

    const db = await connectDB()
    if(!db) return {
        error:'db error',
        totalUsers:undefined,
        newUsers:undefined,
        activeUsersHourly:undefined,
        admins:undefined,
        activeUsersWeakly:undefined,
    }
    try {
    const totalUsers = await UserModel.find().countDocuments()
    const admins = await UserModel.find({role:'admin'}).countDocuments()
    const newUsers = await UserModel.find({createdAt: {$gte:yesterday}}).countDocuments()
    const activeUsersWeakly = await UserModel.find({createdAt: {$gte:aWeakBefore}}).countDocuments()
    statData = {
        error:'db error',
        totalUsers:totalUsers,
        newUsers:newUsers,
        activeUsersHourly:undefined,
        admins:admins,
        activeUsersWeakly:activeUsersWeakly,
    }
    } catch (error) {
        return {
            error:'internal error',
            totalUsers:undefined,
            newUsers:undefined,
            activeUsersHourly:undefined,
            admins:undefined,
            activeUsersWeakly:undefined,
        }
    }
    return statData
}