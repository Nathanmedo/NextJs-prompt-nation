import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import connectToDB from "@utils/database";
import User from "@models/userModel";




const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    async session({session}){

        //check if the session exists

        const userSession = await User.findOne({
            email: session.user.email
        });
        console.log(session);
        
        //convert sessionId to string.

        session.user.id = userSession._id.toString();

        return session;

    },
    async signIn({profile}){
        //connect to database.
        await connectToDB();

        //check if user exists
        const userExists = await User.findOne({
            email: profile.email,

        })

        //create user if it doesn't exist
        if(!userExists){
            await User.create({
                email: profile.email,
                username: profile.name.replace(" ", "").toLowerCase(),
                image: profile.picture
            })
        }
        return true;
    }
    
});

export {handler as GET, handler as POST};