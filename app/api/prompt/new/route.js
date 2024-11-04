import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";


export async function POST(request){
    console.log(await request.json());
    
    const { prompt, tag, creator } = await request.json()

    try{
        await connectToDB();

        //create new prompt object from the promptModel
        const newPrompt = new Prompt({
            creator,
            prompt,
            tag
        });
        //save the new prompt to the database
        await newPrompt.save();
        //return the already saved prompt to the clientside 
        return new Response(JSON.stringify(newPrompt), {status: 201});
    }catch(error){
        return new Response('Failed to create new prompt', { status: 500 })
    }
}