import { PropsWithChildren } from "react";

export interface CourseData {
    name:string,
    courseCode:string,
    lemonsToUnlock?:number
}
export interface ProgramData {
    country:string,
    collage:string,
    deadline:string,
    coverage:string,
    level:string,
    officialLink:string,
    description:string,
}
export interface QuestionData {
    '_id'?:any,
    question:string,
    answer?:string,
    choices?:string[],
    university?:string,
    year?:string,
    subject:string,
}
export interface userData {
    firstName?:string,
    userId?:number,
    role?:string,
    lemons?:number,
    username?:string,
    isPremium?:boolean
}
export interface statsData {
    error?:string,
    newUsers?:number,
    activeUsersHourly?:number,
    activeUsersWeakly?:number,
    admins?:number,
    totalUsers?:number,
}
export interface courseData {
    '_id'?:any,
   name:string,
   courseCode:string,
   visits?:number,
   lemonsToUnlock?:number
}
export interface TaskData extends PropsWithChildren {
    _id?:any,
    taskName: string;
    secondaryInfo: number;
    actionText: string;
    link: string;
    linkType: "direct" | "share";
  }