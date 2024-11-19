import { Schema,model,models } from 'mongoose'

const courseSchema = new Schema({
    name:{
        type:String,
        // required:true,
    },
    courseCode: {
        type:String,
        // required:true
    },
    lemonsToUnlock: {
        type: Number,
        default: 150,
    }
  
})

const CourseModel = models.course || model('course',courseSchema)
 export default CourseModel