import { z } from 'zod'

export const schemaGetFilteredQuestions = z.object({
    skip: z.number({message:'skip parametre is not number'})
    .nonnegative({message:'skip should be nonNegative number'}),
    year:z.string({message:'year should be string'})
    .max(4,{message:' year must be 4 digit'})
    .min(3,{message:'year should have a lenght of 3 or greater'}),
    university:z.string({message:'university parametre is should be string'})
    .min(3,{message:'university should have a lenght of 3 or greater'}),
    subject: z.string({message:'subject should be string'})
    .min(4,{message:'subject must be 4 digit'})
})

export const schemaCourse = z.object({
    name:z.string(),
    courseCode:z.string().min(4,{message:'course code should at least be 4 characters'})
})
export const schemaProgram = z.object({
    country: z.string().min(3,{message:'Enter a correct country'}),
    collage: z.string(),
    description:z.string().min(15,{message:'description is too short'}),
    deadline:z.string(),
    coverage:z.string(),
    level:z.string(),
    officialLink:z.string()
})
export const shemaTask = z.object({
    taskName: z.string().min(2),
    secondaryInfo:z.string(),
    actionText:z.string(),
    link:z.string(),
    linkType:z.enum(['direct','share'])
})