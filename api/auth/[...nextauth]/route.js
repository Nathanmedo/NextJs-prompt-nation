import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import connectToDB from "@utils/database";

console.log( {clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET});


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){

    },
    async signIn({profile}){
        //connect to database.

    }
});

export {handler as POST, handler as GET};