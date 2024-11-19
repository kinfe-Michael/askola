"use client"
import HeroElements from "@/components/homePageComponents/heoElements";
import Hero from "@/components/homePageComponents/hero";
import { addUserAction } from "@/controllers/actions/addUser";
import { getUserAction } from "@/controllers/actions/getUserAction";
import { inviteAction } from "@/controllers/actions/inviteAction";
import {  } from "@telegram-apps/sdk";
import { useInitDataRaw, useLaunchParams,initCloudStorage } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const user = useInitDataRaw()
  const [userStat,setUserStat] = useState<{lemons?:number,role?:string} | null>(null)
  const cloudeStorage = initCloudStorage()

  // cloudeStorage.delete('userData')
useEffect(()=>{
  const invitationData = {
    inviteeId:user.result?.user?.id,
    inviterId:user.result?.startParam,
    inviteeName:user.result?.user?.firstName
  }
  if( typeof invitationData.inviteeId === 'number' &&
    typeof invitationData.inviterId === 'string' &&
    typeof invitationData.inviterId === 'string' 
  ){
      inviteAction(invitationData)
  }
     addUserAction({
      firstName:user.result?.user?.firstName,
      userId:user.result?.user?.id,
      username:user.result?.user?.username,
      isPremium:user.result?.user?.isPremium, 
     }).then(res => {
      if(!res ) return
      if(res.message === 'user created' ){
        toast.success('You won 500 lemons for joining')
      }
       setUserStat(res.data)
      return
     } )

},[user])
  return (
    <main  className={`flex bg-gray-100  w-full min-h-[100dvh] flex-col items-center justify-start `}>
    
      <Hero />
      <HeroElements role={userStat?.role} />
    </main>
  );
}
