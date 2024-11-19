"use client";
import TaskWithDrawer from "@/components/earnPageComponents/taskWithDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { getTaskAction } from "@/controllers/actions/getTasks";
import { getUserAction } from "@/controllers/actions/getUserAction";
import { TaskData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { HiOutlineCash } from "react-icons/hi";
import { initInitData } from '@telegram-apps/sdk'
function EarnPage() {
 const [tasks,setTasks] = useState<TaskData[] | null>(null)
 const id = initInitData()?.user?.id
 let user

  const {data} = useQuery({
    queryKey:['user'],
    queryFn: async ()=> id && await getUserAction(id)
   })
   user = data?.user[0]
 
useEffect(()=>{
  async function getTask(){
   const res = await getTaskAction()
    setTasks(res.tasks)
  }
  getTask()
},[])
  return (
    <div className=" bg-gray-100 flex flex-col min-h-dvh">
      <div className="rounded-md w-full mb-4 bg-gradient-to-b from-gray-50  to-white  flex flex-col items-center justify-center h-56">
        <div className="h-36 w-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <HiOutlineCash className="text-lg text-green-400" />
            <p className="text-3xl">{user?.lemons ||  '0' } lms</p>
          </div>
          <p className="text-sm text-gray-400">Your Balance</p>
        </div>
        {/* <div className="flex gap-4 w-full justify-around">
          <div className="h-16 shadow-sm bg-white flex flex-col items-center justify-center m-2 w-full rounded-md ">
            <p className="text-gray-400 text-xs">Friends</p>
            <hr className="m-1" />
            <p className="text-sm">
              5
            </p>
          </div>
          <div className="h-16 shadow-sm bg-white flex flex-col items-center justify-center m-2 w-full rounded-md ">
            <p className="text-gray-400 text-xs">Tasks</p>
            <hr className="m-1" />
            <p className="text-sm">
              +210 <span className="text-xs text-gray-500">lms</span>
            </p>
          </div>
          <div className="h-16 shadow-sm bg-white flex flex-col items-center justify-center m-2 w-full rounded-md ">
            <p className="text-gray-400 text-xs">Loyality</p>
            <hr className="m-1" />
            <p className="text-sm">
              100 <span className="text-xs text-gray-500">lms/day</span>
            </p>
          </div>
        </div> */}
      </div>
      <div className="flex bg-white flex-col flex-grow p-2  overflow-auto gap-2">
      <p className="m-4 font-semibold">Tasks</p>
       
       {
        !tasks && <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-12"  />
          <Skeleton className="w-full h-12"  />
          <Skeleton className="w-full h-12"  />
          <Skeleton className="w-full h-12"  />
          <Skeleton className="w-full h-12"  />
        </div>
       }
        {tasks?.map((task:TaskData) => (
        <TaskWithDrawer 
        key={task._id}
        linkType={task.linkType}
        link={task.link}
        actionText={task.actionText}
         taskName={task.taskName} 
         secondaryInfo={task.secondaryInfo} />
      ))}
      </div>
    </div>
  );
}

export default EarnPage;
