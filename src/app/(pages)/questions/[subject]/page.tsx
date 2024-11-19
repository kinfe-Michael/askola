"use client";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getFilteredQuestions } from "@/controllers/actions/getFilteredQuestions";
import { useInfiniteQuery } from "@tanstack/react-query";
import QuestionComponent from "@/components/questionsPageComponents/question";
import toast from "react-hot-toast";
import { QuestionData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
function QuestionsPage({ params }: any) {
  const [queryKey, setQueryKey] = useState(`${params.subject}_all_all_unknown`);
  const [year, setYear] = useState("all");
  const [university, setUniversity] = useState("all");
  const subject = params.subject;
  const [examType,setExamType] = useState<'mid' | 'final' | 'unknown'>('unknown')

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: ({ pageParam }) => getFilteredQuestions(pageParam),
      initialPageParam: {
        skip: 0,
        subject: subject,
        year: year,
        university: university,
        examType:examType,
      },
      getNextPageParam: (lastPage: any): any => {
        if (lastPage?.questions?.length < 9) return undefined;
        return lastPage?.nextCursor;
      },
      staleTime: Infinity,
    });

  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      inView && hasNextPage && fetchNextPage();
    },
  });

  let allQuestions: QuestionData[] = [];
  data?.pages.map((pages) => {
    return pages?.questions?.map((singleQuestion: QuestionData) => {
      allQuestions.push(singleQuestion);
      return singleQuestion;
    });
  });

  if (data?.pages[0].error) {
    toast.error(data.pages[0].error);
  }
  return (
    <div className="bg-gray-100 min-h-dvh">
      <div className=" flex gap-2 flex-col items-center justify-center text-black font-sans">
        <div className="flex  gap-2  p-2 bg-white w-full ">
          <div className="flex items-center w-full gap-2 justify-center ">
            <div className="w-[80px]">
              <p className="text-xs text-gray-400 ml-4">university</p>
              <Select
                onValueChange={(value) => {
                  setUniversity(value);
                  setQueryKey((pre) => {
                    const oldKey = pre.split("_");
                    const newKey = [oldKey[0], value, oldKey[2],oldKey[3]].join("_");
                    return newKey;
                  });
                }}
              >
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="All"/>
                </SelectTrigger>
                <SelectContent className=" bg-gray-100">
                  <SelectItem value="all">All universities</SelectItem>
                  <SelectItem value="AASTU">Adama science and tech..</SelectItem>
                  <SelectItem value="AAU">Addis Abeba university</SelectItem>
                  <SelectItem value="AMU">Arbaminch university</SelectItem>
                  <SelectItem value="BDU">Bahirdar university</SelectItem>
                  <SelectItem value="DBU">Debre Birhan university</SelectItem>
                  <SelectItem value="UOG">Gondar university</SelectItem>
                  <SelectItem value="MTU">Metu university</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[80px]">
              <p className="text-xs text-gray-400 ml-4">year</p>
              <Select
                onValueChange={(value) => {
                  setYear(value);
                  setQueryKey((pre) => {
                    const oldKey = pre.split("_");
                    const newKey = [oldKey[0], oldKey[1], value,oldKey[3]].join("_");
                    return newKey;
                  });
                }}
                defaultValue="all"
              >
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="  bg-gray-100">
                  <SelectItem value="2016">2016</SelectItem>
                  <SelectItem value="2015">2015</SelectItem>
                  <SelectItem value="2014">2014</SelectItem>
                  <SelectItem value="2013">2013</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            
            </div>
          </div>
          <div className="flex   gap-2 items-end justify-around">
              <Button
              onClick={()=>{
                setExamType('mid')
                setQueryKey((pre) => {
                  const oldKey = pre.split("_");
                  const newKey = [oldKey[0], oldKey[1],oldKey[2],'mid'].join("_");
                  return newKey;
                });
              }} 
              className={`${examType === 'mid' ? 'text-white bg-green-400' : 'text-black bg-gray-100'}`}>Mid</Button>
              <Button 
                   onClick={()=>{
                    setExamType('final')
                    setQueryKey((pre) => {
                      const oldKey = pre.split("_");
                      const newKey = [oldKey[0], oldKey[1],oldKey[2],'final'].join("_");
                      return newKey;
                    });
                  }} 
                className={` ${examType === 'final' ? 'text-white bg-green-400' : 'text-black bg-gray-100'} `}>Final</Button>
          </div>
        </div>

        {allQuestions?.map((questionData: QuestionData) => {
          return (
            <QuestionComponent
              key={questionData._id}
              questionData={questionData}
            />
          );
        })}

        {isFetching || isFetchingNextPage ? (
          <>
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-64" />
          </>
        ) : allQuestions.length === 0 ? (
          <p>Ooops no questions</p>
        ) : (
          hasNextPage || <p>Your all cought up</p>
        )}

        <div ref={ref} className="p-2 "></div>
      </div>

      
    </div>
  );
}

export default QuestionsPage;
