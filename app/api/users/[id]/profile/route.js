import connectToDB from "@utils/database";
import User from '@models/userModel';
import Prompt from '@models/promptModel';
import { NextResponse } from "next/server";


export async function GET(request, {params}){

    try{
        console.log(params);
        
        await connectToDB();
        //find user 

        const findUser = await Prompt.find({creator: params.id}).populate('creator');

        if(!findUser){
            return NextResponse.json({message: "This user does not exist"});
        };
        console.log(findUser);
        
        return NextResponse.json({message: "User found!", data: findUser}, {status: 202});
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 404});
    }
}