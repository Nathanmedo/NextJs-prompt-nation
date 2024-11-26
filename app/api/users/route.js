import connectToDB from "@utils/database";
import User from "@models/userModel";
import { NextResponse } from "next/server";

//confirm follow
export async function POST(request){
    const { userId, currentId } = await request.json();
    console.log(userId, currentId);
    

    try{
        await connectToDB();
        console.log('successfully connected to db');

        const user = await User.findById(userId);

        //confirm follow
        if(user.followers.includes(currentId)){
            return NextResponse.json({message: "Following User Already", isFollowing:true}, {status: 200})
        }
        return NextResponse.json({message: "Not following user", isFollowing: false}, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'failed to confirm'}, {status: 500})
    }
}

export async function PATCH(req){
    const { id, username, bio, skills } = await req.json();   
    
    
    try{
        await connectToDB();

        const user = await User.findByIdAndUpdate(id, 
        {$set: {username, bio, skills}},
        {new: true, runValidators: true})
        console.log('updated sucessfully');
        if(!user){
            return NextResponse.json({message: 'User not found'}, {status: 404});
        }
        return NextResponse.json({message: 'Successfully Updated users details'}, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'Error occured while updating users details'}, {status: 500})
    }
}