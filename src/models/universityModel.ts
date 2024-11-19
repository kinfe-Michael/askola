import { model,models,Schema } from 'mongoose'
const universitiesSchema = new Schema({
    name:{
        type:String,
        requied:true,
    },
    UniversityCode:{
        type:String,
        required:true
    }
})

const universityModel = models.university || model('university',universitiesSchema)
export default universityModel