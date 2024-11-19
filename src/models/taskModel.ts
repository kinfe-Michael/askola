import { model,models,Schema } from 'mongoose'
const tasksSchema = new Schema({
    taskName:{
        type:String,
        requied:true,
    },
    actionText:{
        type:String,
        requied:true,
    },
    secondaryInfo:{
        type:Number,
    },
    link:{
        type:String,
        required:true
    },
    linkType:{
        type:String,
        required:true
    } 
})

const TaskModel = models.task || model('task',tasksSchema)
export default TaskModel