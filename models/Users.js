import mongoose from 'mongoose'
// import { body,  } from 'express-validator';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true},
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true}
});

// UserSchema.pre([])

export default mongoose.model('User',UserSchema);
