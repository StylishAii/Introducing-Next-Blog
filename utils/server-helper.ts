import mongoose from "mongoose";

const connect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!, {
            dbName:"nextauth",
            authSource:"admin"
        });
        console.log("MongoDB connection successfully established")
    } catch(err){
                throw new Error("Error occured while connecting mongodb");
    }
}

export default connect;