import mongoose from "mongoose";

const connect = async () => {
    if(mongoose.connections[0].readyState){
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log("MongoDB connection successfully established")
    } catch(err){
                throw new Error("Error occured while connecting mongodb");
    }
}

export default connect;