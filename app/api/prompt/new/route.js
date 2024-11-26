import Prompt from "@models/promptModel";
import connectToDB from "@utils/database";
import { NextResponse } from "next/server";


export async function POST(request){
    
    const content = await request.json();
    const { prompt, tag, creator } = content;
    

    try{
        await connectToDB();
        console.log('creating new prompt...');
        
        //create new prompt object from the promptModel
        const newPrompt = new Prompt({
            creator,
            prompt,
            tag
        });
        //save the new prompt to the database
        await newPrompt.save();
        //return the already saved prompt to the clientside 
        return NextResponse.json(newPrompt, {status: 201});
    }catch(error){
        return NextResponse.json('Failed to create new prompt', { status: 500 })
    }
}