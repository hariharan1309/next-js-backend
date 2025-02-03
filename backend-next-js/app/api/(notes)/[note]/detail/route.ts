import { connect } from "@/lib/db";
import Notes from "@/lib/modals/notes";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: { params: any }) => {
  try {
    const noteId = context.params.note;
    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), { status: 400 });
    }
    await connect();
    const noteResp = await Notes.findById(noteId); // same as findOne({_id: noteId})
    if (!noteResp) {
      return new NextResponse(JSON.stringify({ message: "Note not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Note Found", data: noteResp }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify("Error " + error), { status: 500 });
  }
};
