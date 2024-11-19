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
    },
    following:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }] //make sure the schema field is set to a type of array with []
}, {
    timestamps: true  // This will add createdAt and updatedAt fields
});

//create a method for following users
userSchema.methods.follow = async function (userID){
    if(!this.following.includes(userID)){
        this.following.push(userID);
    }
    await User.findByIdAndUpdate(userID, {
        $push: { followers: this._id}
    })
};

//create a method for unfollowing
userSchema.methods.unfollow = async function (userID){
    if(this.following.includes(userID)){
        this.following.pull(userID);
    }
    await User.findByIdAndUpdate(userID, {
        $pull: { followers : this._id }
    })
}

const User = models.User || model('User', userSchema);

export default User;