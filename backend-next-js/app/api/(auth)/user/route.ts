import { connect } from "@/lib/db"
import User from "@/lib/modals/user";
import { NextResponse } from "next/server"

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