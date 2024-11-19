import User from '@models/userModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';


export async function GET(request,{params}){
    try{
        await connectToDB();
        
        //unfollow user
        await User.unfollow(params.id)

        return NextResponse.json({message: "Successfully unfollowed user"}, {status: 200})
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}