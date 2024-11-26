import User from '@models/userModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';


export async function POST(request, {params}){
    const { userId, currentUserId } = await request.json();
    console.log(userId, currentUserId);
    
    try{
        await connectToDB();


        const user = await User.findById(userId);
        console.log('found user data with followers and following', user);

        //find the current user
        const currentUser = await User.findById(currentUserId);
        console.log(currentUser);
        

        if(!user.followers.includes(currentUserId)){
            return NextResponse.json({message: "User already unfollowed", isFollowing: false}, {status: 400});
        }
        console.log('confirmatioon done');
        
        //unfollow user
        await currentUser.unfollow(userId);
        console.log('unfollow method used');
        

        return NextResponse.json({message: "Successfully unfollowed user", isFollowing: false}, {status: 200})
    }catch(error){
        return NextResponse.json({message: error.message, isFollowing: true}, {status: 500});
    }
}