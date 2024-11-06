import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isDbConnected = false;

const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(isDbConnected){
        console.log('database is already connected!');
        return;
    }
    try{
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'shared_prompts',
                useNewUrlParser:true,
                useUnifiedTopology: true
            });
            isDbConnected = true;

            console.log('database is connected!');
            
        }catch(error){
            console.log('failed to connect to database.');
            
    }
}

export default connectToDB;