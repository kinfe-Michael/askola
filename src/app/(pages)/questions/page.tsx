"use client";
import React, { ReactNode } from "react";
import SubjectComponent from "./components/subject";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCoursesAction } from "@/controllers/actions/getCoursesAction";

function QuestiosPage() {

  const {data,isFetched} = useQuery({
    queryKey:['courses'],
    queryFn: ()=> getCoursesAction(),
  }) 
 const coursesElement= data?.map(course => {
  return <SubjectComponent key={course.courseCode} courseCode={course.courseCode} name={course.name}  />

})
  return (
      <div className="w-full  flex bg-gray-100 flex-col items-center justify-center  min-h-dvh">
       
        <div className="w-4/5 rounded-lg bg-white shadow-lg shadow-gray-100 flex flex-col  h-5/6">
          <div className="flex items-center">
            <Link href="/">
              <HiOutlineArrowLeft className="ml-4" />
            </Link>
            <h2 className="   font-sans m-2">Select Subject</h2>
          </div>

          <div className="w-full overflow-auto py-2 px-4 gap-2 flex flex-col items-center  h-full ">
              {coursesElement && coursesElement}
            
          </div>
        </div>
      </div>

  
  );
}

export default QuestiosPage;
