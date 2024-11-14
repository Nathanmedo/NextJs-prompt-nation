import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers']
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image:{
        type: String
    }
}, {
    timestamps: true  // This will add createdAt and updatedAt fields
});


const User = models.User || model('User', userSchema);

export default User;