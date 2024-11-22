import connectToDB from "@utils/database";
import User from "@models/userModel";
import { NextResponse } from "next/server";

//confirm follow
export async function POST(request, {params}){
    const { userId, currentId } = request.json();

    try{
        await connectToDB();
        console.log('successfully connected to db');

        const user = await User.findById(userId);

        //confirm follow
        if(user.followers.includes(currentId)){
            return NextResponse.json({message: "Following User Already", isFollowing:true}, {status: 409})
        }
        return NextResponse.json({message: "Not following user", isFollowing: false}, {status: 409})
    }catch(error){
        return NextResponse.json({message: 'failed to confirm'}, {status: 500})
    }
}