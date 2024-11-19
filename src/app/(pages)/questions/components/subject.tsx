"use client"
import Link from "next/link";
import React from "react";
import {} from "react-icons";
import {initInitData} from '@telegram-apps/sdk'
import { HiLockClosed, HiLockOpen, HiStar } from "react-icons/hi2";
import { updateLemonsAction } from "@/controllers/actions/updateLemonsAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Subject {
  name: string;
  isUnlocked?: boolean;
  courseCode:string
}
function SubjectComponent({ name,courseCode, isUnlocked }: Subject) {
 const updateData = {
  userId:initInitData()?.user?.id,
  add:0,
  subs:100,
 }
 const router = useRouter()
  return (
    <div
    onClick={async ()=>{
      
      if(typeof updateData.userId !== 'number') return
      const res = await updateLemonsAction(updateData)
      if(res?.error){
        toast.error('somthing went wrong! try again later')
        return
      }
      if(res?.lowLemons){
        router.replace('/earn')
        return
      }
      router.push(`/questions/${courseCode}`)
      return
    } }
      className="w-full p-2  flex items-center gap-2 border-gray-100   border rounded-lg min-h-12 max-h-12 "
    >
      {
        isUnlocked ? <HiLockOpen className="text-gray-500"/> : <HiLockClosed className="text-gray-500" />
      }

      <p className="flex-grow">{name}</p>
      {isUnlocked ? (
        <p className="text-xs text-gray-400">Unlocked</p>
      ) : (
        <div className="flex items-center text-gray-400 gap-2">
          <p className="text-sm">100</p>
          <HiStar className="text-green-400 " />
        </div>
      )}
    </div>
  );
}

export default SubjectComponent;
