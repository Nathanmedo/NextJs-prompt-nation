import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const response = NextResponse.json({
            message: "Logout successful"
        }, {status: 200});
        response.cookies.set("token", "", {httpOnly: false, sameSite: "Lax", secure: false});
        return response;
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}