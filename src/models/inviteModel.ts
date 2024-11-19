import { model,models,Schema } from 'mongoose'
const ivitationsSchema = new Schema({
    inviterId:{
        type:Number,
        requied:true,
    },
    inviteeId:{
        type:Number,
        requied:true,

    },
    inviteeName:{
        type:String,
        requied:true,

    }, 
})

const InviteModel = models.invite || model('invite',ivitationsSchema)
export default InviteModel