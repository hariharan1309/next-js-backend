import { Schema, model, models } from "mongoose";

const NotesSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Notes = models.Notes || model("Notes", NotesSchema);

export default Notes;