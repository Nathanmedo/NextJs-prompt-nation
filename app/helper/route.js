import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET(request){
    try{
        //get the encoded token from the cookie
        console.log(request);
        const token = request.cookies.get("token")?.value || "";
        console.log(token);
        
        //decode the token
        console.log(process.env.JWT_SECRET);
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);

        //return the token id
        return NextResponse.json(decodedToken, {status:200});
    }catch(error){
        return NextResponse.json({message: error.message}, {status:500});
    }
}

