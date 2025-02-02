import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = models.User || model("User", UserSchema)