import mongoose from "mongoose";

const MONGOURI = process.env.MONGODB_URL;

export const connect = async () => {
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
                dbName: "nextrestapi",
                // bufferCommands: false,
            })
        }
    } catch (error) {
        console.log(error)
    }
}


