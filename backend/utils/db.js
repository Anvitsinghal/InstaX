import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("db connected");
    } catch (error) {
        console.error(error);
    }
}
export default connectDB;