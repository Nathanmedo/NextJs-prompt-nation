import User from '@models/userModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';


export async function GET(request, {params}){
    try{
        await connectToDB();

        //use the follow method
        await User.follow(params.id)
        //response 
        return NextResponse.json({message: "Successfully followed"}, {status: 200})
    }catch(error){
        return NextResponse.json({message: "Error following user", error});
    }
}