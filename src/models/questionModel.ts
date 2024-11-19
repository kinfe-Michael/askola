import {model, models,Schema} from 'mongoose'

const questionSchema = new Schema({
   question: {
    type:String,
    required:true,
   },
   answer: String,
   choices: [],
   year: {
    type: String,
    default: 'all',
   },
   university: {
    type: String,
    default: 'all',
   },
   subject: {
    type: String,
    required:true
   },
   examType: String,
   
})

 const QuestionModel = models.question || model('question',questionSchema)
 export default QuestionModel