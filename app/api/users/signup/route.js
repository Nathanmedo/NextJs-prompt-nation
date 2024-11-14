import connectToDB from "@utils/database";
import User from "@models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


//creating regex for plain password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,20}$/;

export const POST = async (request) => {
    const { username, email, password } = await request.json();

    try{
        await connectToDB();
        
        if(!passwordRegex.test(password)){
            return NextResponse.json({message: "Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"}, {status:400});
        }
        //check if user exists 
        const userExists = await User.findOne({email: email});

        if(userExists){
            return NextResponse.json({message:"User Already Exists"}, {status:400});
        }
        console.log('user confirmation done, creating hash');
        
        //hash password
        const hash = await bcryptjs.genSalt(10);
        console.log('hash created');
        
        const hashedPassword = await bcryptjs.hash(password, hash);
        console.log('password hashed');
        

        //create new user if not exists
        await User.create({
            email:  email,
            username: username.toLowerCase(),
            password: hashedPassword,
            image: '/assets/user-profile.png'
        });

        return NextResponse.json({message: "User Created Successfully, login to continue"}, {status:201});

    } catch(error){
        // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
        return NextResponse.json({ message: "Email already exists!" }, { status: 400 });
    }

    // Check for validation errors (missing required fields, incorrect format)
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: `Validation failed: ${error.message}` }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ message: "Failed to create user", error: error.message }, { status: 500 });
    }
};