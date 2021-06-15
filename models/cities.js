import mongoose from "mongoose"

const citiesSchema = new mongoose.Schema({
    cityName:{
        type: String,
        required: true
    }
})



export default mongoose.model('Cities',citiesSchema)