import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    userId:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^[a-zA-Z0-9._-]{8,20}$/,'Username Invalid, It must contain 8-20 alphanumeric letters and be unique!']
    },
    image:{
        type: String
    }
})

const User = models.User || model('User', userSchema);

export default User;