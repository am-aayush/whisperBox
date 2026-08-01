import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function PUT(request: Request) {
    // console.log(request.json())
    const response = await request.json()
    const messageId = response.messageid
    const action = response.action
    console.log(response)
    await dbConnect()
    const session = await getServerSession(authOption)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    try {
        if (action === "mar") {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "messages._id": messageId },
                { $set: { "messages.$.isRead": true } }
            )
            if (updateResult.modifiedCount == 0) {
                return Response.json({ success: false, message: "Message not found or already Marked as Read" }, { status: 400 })
            }
            return Response.json({ success: true, message: "Message Marked as Read" }, { status: 200 })
        }
        if (action === "archive") {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "messages._id": messageId },
                { $set: { "messages.$.isArchived": true } }
            )
            if (updateResult.modifiedCount == 0) {
                return Response.json({ success: false, message: "Message not found or already Archived" }, { status: 400 })
            }
            return Response.json({ success: true, message: "Message Archived" }, { status: 200 })
        }
        if (action === "unarchive") {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "messages._id": messageId },
                { $set: { "messages.$.isArchived": false } }
            )
            if (updateResult.modifiedCount == 0) {
                return Response.json({ success: false, message: "Message not found or already Unarchived" }, { status: 400 })
            }
            return Response.json({ success: true, message: "Message Unarchived" }, { status: 200 })
        }

    } catch (error) {
        return Response.json({ success: false, message: "Internal Server Error", error: error }, { status: 500 })
    }

}