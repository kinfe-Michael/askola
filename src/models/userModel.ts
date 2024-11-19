import { model,models,Schema } from 'mongoose'
const usersSchema = new Schema({
    firstName:{
        type:String,
        requied:true,
    },
    username:{
        type:String,
    },
    lemons:{
        type:Number,
        default: 500,
    },
    isPremium:Boolean,
    userId:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:'basic'
    } 
},{timestamps:true})

const UserModel = models.user || model('user',usersSchema)
export default UserModel