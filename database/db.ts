import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI_LOCAL = process.env.MONGO_URL_LOCAL;
const MONGO_URI_PROD = process.env.MONGO_URL_PROD;

async function connectDB() {
    const MONGO_URI = process.env.NODE_ENV === "prod" ? MONGO_URI_PROD : MONGO_URI_LOCAL;
    if(!MONGO_URI){
        console.log("Unable to find DB");
        return;
    }
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log(`Connected to ${MONGO_URI}`)

    }catch (err: unknown) {
        if(err instanceof Error) {
            console.error(`Error while trying to connect to DB: ${err.message}`);
            process.exit(1);
        }
    }
}
export default connectDB;