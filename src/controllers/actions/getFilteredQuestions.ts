"use server";
import { connectDB } from "@/lib/db";
import { QuestionData } from "@/lib/types";
import QuestionModel from "@/models/questionModel";
import { schemaGetFilteredQuestions } from "@/shemas/actionsShema";
interface Parameter {
  skip: number;
  subject: string;
  year?: string;
  university?: string;
  examType:'mid' | 'final' | 'unknown'
}


export async function getFilteredQuestions({
  skip,
  subject,
  year,
  university,
  examType
}: Parameter): Promise<any> {

  const validation = schemaGetFilteredQuestions.safeParse({
    skip,
    subject,
    year,
    university,
    examType
  });
  if (!validation.success) {
    return JSON.parse(
      JSON.stringify({
        error: "smothing went wronggg",
        nextCursor: {
          skip: skip,
          subject: subject,
          year: year,
          university: university,
          examType:examType
        },
        // errorData: validation.error.issues,
      })
    );
  }
  interface Filter {
    subject: string;
    year?: string;
    university?: string;
    examType?: 'mid' | 'final' | 'unknown'
  }

  let filter: Filter = {
    subject: "",
  };
  try {
    filter.subject = subject;

    if (year !== "all") {
      filter.year = year;
    }
    if(examType !== 'unknown'){
      filter.examType = examType
    }

    if (university !== "all") {
      filter.university = university;
    }

    const db = await connectDB();
    if (db) {
      const questions:QuestionData[] = await QuestionModel.find(filter).skip(skip).limit(10);
      if (questions) {
        return JSON.parse(
          JSON.stringify({
            questions: questions,
            nextCursor: {
              skip: skip + 10,
              subject: subject,
              year: year,
              university: university,
            },
          })
        );
      } else {
        return JSON.parse(
          JSON.stringify({
            error: "server problem",
          nextCursor: {
              skip: skip,
              subject: subject,
              year: year,
              university: university,
            },
            // errorData: validation.error.issues,
          })
        );
      }
    }
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        error: "not working",
        nextCursor: {
          skip: skip,
          subject: subject,
          year: year,
          university: university,
        },
      })
    );
  }
}
