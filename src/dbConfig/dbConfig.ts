import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection =mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })

        connection.on('error',(error)=>{
            console.log('MONGO DB connection error. Please make sure mongoDB is running,' ,+error)
            process.exit();
        })

    }catch(err){
        console.log('Something went wrong')
        console.log(err)
    }
}