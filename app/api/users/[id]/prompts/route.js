import Prompt from '@models/promptModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';

export async function GET(request, {params}){
    const { id } = params;
    try{
        await connectToDB();

        //find the user prompts
        const prompts = await Prompt.find({creator: id}).populate('creator');
        console.log('recieved users prompts sucessfully', prompts);
        
        return NextResponse.json({
            message: "User prompts fetched successfully",
            data: prompts
        }, {status: 200});
    }catch(error){
        return NextResponse.json({message: 'failed to fetch user prompts'}, {status: 500})
    }
}