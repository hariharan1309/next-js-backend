import { connect } from "@/lib/db";
import User from "@/lib/modals/user";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { useId } from "react";

export const GET = async () => {
  await connect();
  try {
    const resp = await User.find();
    return new NextResponse(JSON.stringify(resp), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error " + error, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const payload = new User(body);
    await payload.save();
    return new NextResponse(
      JSON.stringify({ message: "New User Created", resp: payload }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse("Error in User Creation" + error, { status: 500 });
  }
};

const ObjectIdType = require("mongoose").Types.ObjectId;

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, userName } = body;
    await connect();
    if (!useId || !userName) {
      return new NextResponse(JSON.stringify("Error Provie ID/UserName"), {
        status: 400,
      });
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    const Updated = await User.findOneAndUpdate(
      { _id: new ObjectIdType(userId) }, // first is to find the Object from the db
      { name: userName }, // second is to update the object
      { new: true } // third is to return the updated object
    );
    if (!Updated) {
      return new NextResponse(JSON.stringify("User Not Found"), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "User Updated", resp: Updated }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Error in User Update" + error, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url); // get the search params from the url
    const userId = searchParams.get("userId"); // get the userId from the search params
    if (!userId) {
      return new NextResponse(JSON.stringify("Error Provide ID"), {
        status: 400,
      });
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid ID"), {
        status: 400,
      });
    }
    await connect();
    const Deleted = await User.findByIdAndDelete(new Types.ObjectId(userId));

    if (!Deleted) {
      return new NextResponse(JSON.stringify("User Not Found"), {
        status: 400,
      });
    }
    return new NextResponse(JSON.stringify({ message: "User Deleted" }), {
      status: 200, // 204 should be no content not message while deleting
    });
  } catch (error) {
    return new NextResponse("Error in User Deletion" + error, { status: 500 });
  }
};
