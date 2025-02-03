import { connect } from "@/lib/db";
import Notes from "@/lib/modals/notes";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connect();
    const notes = await Notes.find();
    if (!notes) {
      return new NextResponse(JSON.stringify({ message: "Notes not found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Notes Found", resp: notes }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Error " + error, { status: 500 });
  }
};
