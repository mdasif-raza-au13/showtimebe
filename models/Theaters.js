import mongoose from 'mongoose'

const theatersSchema = new mongoose.Schema({
    theaterName: {
        type: 'string',
        required: true
    }
})

export default mongoose.model('Theaters', theatersSchema)