import mongoose from "mongoose";


let isDbConnected = false;

const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(!isDbConnected){
            try{
                await mongoose.connect(process.env.MONGODB_URI, {
                    dbName: 'shared_prompts'
                });
                isDbConnected = true;

                console.log('database is connected!');
                
            }catch(error){
                console.log('failed to connect to database.');
                
        }
    }
}

export default connectToDB;