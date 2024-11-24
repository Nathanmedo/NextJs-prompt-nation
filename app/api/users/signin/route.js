import connectToDB from "@utils/database";
import User from "@models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { emailOrUsername, password } = await request.json();

    try{
        await connectToDB();
        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(emailOrUsername);
        console.log(isEmail);
        
        //check if user exists 
        const userExists = await User.findOne(isEmail ? {email: emailOrUsername} : {username: emailOrUsername});

        console.log('user exists');

        if(!userExists){
            console.log('user does not exist');
            
            return NextResponse.json({message: "User does not exist"}, {status:400});
        }

        
        //check if password is correct 
        const passwordMatch = await bcryptjs.compare(password, userExists.password);
        
        console.log('password match');
        if(!passwordMatch){
            console.log('invalid password');
            return NextResponse.json({message: "Invalid Password"}, {status:400});
            
        }

        
        //create tokendata
        const tokenData = {
            user:{
                id: userExists._id,
                email: userExists.email,
                name: userExists.username,
                image: userExists.image || '/assets/user-profile.png'
            }
        }
        console.log('created token data');
        //create token for login session
        console.log(process.env.JWT_SECRET);
        
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});
        console.log('created token');

        const response  = NextResponse.json({message: "Login successful"}, {status:200});
        console.log('created response');
        
        response.cookies.set("token", token, {httpOnly: false, sameSite: "Lax", secure: false});
        console.log('set token in cookies');
        
        
        return response;
    }catch(error){
        return NextResponse.json({message: error.message}, {status:500});
    }
}