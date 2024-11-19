import User from '@models/userModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';


export async function POST(request, {params}){

    const { userId, currentUserId } = await request.json();
    console.log(userId, currentUserId);
    
    try{
        await connectToDB();
        console.log('successfully connected to db');
        
        
        //find user by id
        const user = await User.findById(params.id);
        console.log('found user data', user);
        

        //check if already following user
        if(user.followers.includes(currentUserId)){
            return NextResponse.json({isFollowing: true, message: "Following User Already"}, {status: 409})
        }
        console.log('confirmation done');
        
        //use the follow method
        await User.follow(params.id);
        console.log('follow method used');
        

        //response 
        return NextResponse.json({message: "Successfully followed", isFollowing: true}, {status: 200})
    }catch(error){
        return NextResponse.json({message: "Error following user", isFollowing: false});
    }
}