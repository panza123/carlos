import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected successfully${connect.connection.host}`);

    }catch(err){
        console.error("Error connecting to MongoDB:",err.message);
        process.exit(1);
    }
}