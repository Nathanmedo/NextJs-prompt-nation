import connectToDB from "@utils/database";
import Prompt from "@models/promptModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await connectToDB();

        //fetch the prompts
        const Prompts = await Prompt.find({}).populate('creator');

        console.log(Prompts);
        

        return NextResponse.json({
            message: 'Fetch prompts successfully',
            success: true,
            Prompts
        });

    }catch(error){
        return NextResponse.json({message: 'Failed to fetch prompts, try reloading the page',
            success: false
        });
    }
}