import Prompt from '@models/promptModel';
import connectToDB from '@utils/database';
import { NextResponse } from 'next/server';

export async function GET(request, {params}){
    const { id } = params;
    try{
        await connectToDB();

        //find the user prompts
        const prompt = await Prompt.findById(params._id)
        console.log('recieved prompt data', prompt);
        
        //if the prompt is not found
        if(!prompt){
            return NextResponse.json({message: "Prompt not Found!"}, {status: 404});
        }
        //return the prompt for the update-prompt directory.
        return NextResponse.json({
            message: "User prompts fetched successfully",
            data: prompt
        }, {status: 200});
    }catch(error){
        return NextResponse.json({message: 'failed to fetch user prompts'}, {status: 500})
    }
}

//PATCH to update the changes made to the prompt
export async function PATCH(request, {params}){

    const { updatedPrompt } = request.body
    const { id } = params;

    try{
        await connectToDB();

        //find prompt and update it 
        const changesMade = await Prompt.findByIdAndUpdate(id, 
            { $set: updatedPrompt},
            {new: true, runValidators: true}
        );
        
        if(!changesMade){
            return NextResponse.json({message: 'Prompt not found'}, {status: 404});
        }

        return NextResponse.json({message: "Successfully updated prompt", data: changesMade}, {status: 200})
    }catch(error){
        return NextResponse.json({message: "Failed to update changes"}, {status: 500});
    }
};

export async function DELETE(request, {params}){
    const { id } = params;
    try{
        await connectToDB();

        //find by id and delete 
        const deletedPrompt = await Prompt.findByIdAndDelete(id);

        if(!deletedPrompt){
            return NextResponse.json({message: 'Prompt not found'}, {status: 404});
        };

        return NextResponse.json({message: 'Deleted Prompt Sucessfully'}, {status: 200})
    }catch(error){
        return NextResponse.json({message: "Failed to delete prompt"}, {status: 500})
    }
}