import { connect } from "@/lib/db";
import Notes from "@/lib/modals/notes";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // check if the userId is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }

    // connect to the database
    await connect();

    const user = await User.findById({ _id: userId });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const notes = await Notes.find({ user: new Types.ObjectId(userId) }); // as the user field will contain the userId We are finfing it with the user field eq to userId
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

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, desc, user } = body;
    if (!title) {
      return new NextResponse(JSON.stringify("title Required"), {
        status: 400,
      });
    }
    if (!user || !Types.ObjectId.isValid(user)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    await connect();
    const userResp = await User.findById({ _id: user });
    if (!userResp) {
      return new NextResponse(
        JSON.stringify({
          message: "User Not Found",
        }),
        {
          status: 404,
        }
      );
    }
    const payload = new Notes(body);
    await payload.save();
    return new NextResponse(
      JSON.stringify({ message: "New Note Created", resp: payload }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: " Error in Note Creation" + error }),
      {
        status: 500,
      }
    );
  }
};
const ObjectIdType = require("mongoose").Types.ObjectId;

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const { title, desc, user } = body;
    const noteId = searchParams.get("noteId");
    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    if (!user || !Types.ObjectId.isValid(user)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    await connect();
    // const noteResp = await Notes.findOneAndUpdate(
    //   { _id: new ObjectIdType(noteId) },
    //   {
    //     title: title,
    //     desc: desc,
    //   },
    //   { new: true } // third is to return the updated object
    // ); // Basic Approach

    // Checking the Note and also it belongings

    const noteResp = await Notes.findOne({
      _id: new ObjectIdType(noteId),
      user: new ObjectIdType(user),
    }); // Advanced Approach to check the note and also it belongings given user

    if (!noteResp) {
      return new NextResponse(
        JSON.stringify("Note Not Found or not belongs to the User"),
        {
          status: 404,
        }
      );
    }
    const updatedNotes = await Notes.findOneAndUpdate(
      {
        _id: new ObjectIdType(noteId),
      },
      {
        title: title,
        desc: desc,
      },
      { new: true }
    );

    if (!updatedNotes) {
      return new NextResponse(JSON.stringify({ message: "Faild to Update" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Note Updated", note: updatedNotes }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Error in Note Update" + error, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");
    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    const noteResp = await Notes.findByIdAndDelete({ _id: noteId });
    if (!noteResp) {
      return new NextResponse(JSON.stringify({ message: "Note Not Found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Note Deleted", note: noteResp }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Error in Note Deletion" + error, { status: 500 });
  }
};
