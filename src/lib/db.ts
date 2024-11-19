import mongoose from 'mongoose'
  let MONGODB_URL = ''
if (typeof process.env.MONGODB_URL === 'string') {
   MONGODB_URL =  process.env.MONGODB_URL
}
 export const connectDB = async () => {
    if(mongoose.connections[0].readyState){
        return true
    }
    try {
      await  mongoose.connect(MONGODB_URL)
      return true
    } catch (error) {
        throw error
    }
 }
