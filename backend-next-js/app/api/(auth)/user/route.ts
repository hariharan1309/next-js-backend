import { connect } from "@/lib/db"
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"
import { useId } from "react";

export const GET = async () => {
    await connect();
    try {
        const resp = await User.find();
        return new NextResponse(JSON.stringify(resp), {
            status: 200
        })
    } catch (error) {
        return new NextResponse("Error " + error, { status: 500 })
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const payload = new User(body);
        await payload.save();
        return new NextResponse(JSON.stringify({ message: "New User Created", resp: payload }), {
            status: 201
        })
    } catch (error) {
        return new NextResponse("Error in User Creation" + error, { status: 500 })
    }
}

const ObjectIdType = require("mongoose").Types.ObjectId

export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { userId, userName } = body;
        await connect();
        if (!useId || !userName) {
            return new NextResponse(JSON.stringify("Error Provie ID/UserName"), {
                status: 400
            })
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify("Invalid ID"), {
                status: 400
            })
        }
        //  const Updated=await User.findOneAndUpdate()
    } catch (error) {

    }
}