"use client";
import React, { useState } from "react";

import { HiChevronDown } from "react-icons/hi2";

interface QuestionData {
  questionData: {
    _id?: string;
    question?: string;
    answer?: string;
    choices?: string[];
    year?: string;
    university?: string;
    subject?: string;
    // studentAnswers: number[];
  };
}

function QuestionComponent({ questionData }: QuestionData) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const alphaBet = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="w-full p-2 flex  flex-col bg-white">
      <p className="font-semibold   m-2 "> {questionData.question} </p>
      {questionData.choices && (
        <div className="flex flex-col gap-2">
          {questionData.choices.map((choice, i) => {
            return (
              <div
                onClick={() => {
                  setAnswer(i);
                  setIsAccordionOpen(true);
                }}
                key={i}
                className={`border  rounded-md p-2 flex gap-4 ${
                  answer === i && "border-gray-400"
                }`}
              >
                <p>{alphaBet[i]}</p>
                <p className="text-sm  flex-grow">{choice}</p>
              </div>
            );
          })}
        </div>
      )}

      <div
        onClick={() => setIsAccordionOpen((pre) => !pre)}
        className="  flex flex-col justify-between   rounded-md p-2 my-2"
      >
        <div className="  flex font-medium transition-all justify-between">
          <p>Answer</p>{" "}
          <HiChevronDown
            className={` transition-all duration-100 ${
              isAccordionOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isAccordionOpen && (
          <div className="p-2  ">
            <p className={`text-sm`}>
              {questionData.answer || "OOPS! It looks like you are on your own"}
            </p>
          </div>
        )}
        <hr className="w-full  border-gray-100 mt-4" />
      </div>
      <p className="text-xs self-end text-gray-400">
        {questionData?.university !== "unknown" &&
          questionData?.university !== "all" &&
          questionData?.university},
        {questionData.year} ,{questionData.subject}
      </p>
    </div>
  );
}

export default QuestionComponent;
