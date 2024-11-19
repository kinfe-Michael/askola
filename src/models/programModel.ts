import { Schema, model, models } from "mongoose";

const programsSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  collage: {
    type: String,
    required: true,
  },
  coverage: {
    type:String,
    default:'Score Dependent'
  },
  deadline: {
    type:Date,
    required:true
  },
  level: {
    type:String,
    default: 'Under Graduate'
  },
  officialLink: {
    type:String,
    required:true
  },
  description:String,
});

const ProgramModel = models.program || model("program", programsSchema);
export default ProgramModel;
