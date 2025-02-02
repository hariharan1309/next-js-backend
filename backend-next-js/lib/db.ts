import mongoose from "mongoose";

const MONGOURI = process.env.MONGODB_URL;

const connect = async () => {
    try {
        const connectionState = mongoose.connection.readyState;

        if (connectionState === 1) {
            console.log("Connected...")
        }
        else if (connectionState === 2) {
            console.log("Connecting...")
        }
        else {
            mongoose.connect(MONGOURI!, {
                dbName: "workout",
                bufferCommands: false,
            })
        }
    } catch (error) {
        console.log(error)
    }
}