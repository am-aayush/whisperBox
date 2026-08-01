import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request: Request) {
    const fromDashboard = request.url.includes("fromDashboard=true");
    await dbConnect()
    const session = await getServerSession(authOption)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 })
    }
    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        //if fromDashboard is true, then we need to send the message in descending order of createdAt and also only those message which is unread and not archived. So we will use aggregate to sort the messages in descending order of createdAt and also filter the messages which is unread and not archived. and also just send 6 messages, send totalCount , unreadCount and todayMessageCount
        if (fromDashboard) {
            const updatedUser = await UserModel.aggregate([
                { $match: { _id: userId } },
                {
                    $unwind: {
                        path: "$messages",
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $sort: { "messages.createdAt": -1 } },
                { $group: { _id: "$_id", messages: { $push: "$messages" } } },
                {
                    $project: {
                        messages: {
                            $slice: [
                                {
                                    $filter: {
                                        input: "$messages",
                                        as: "msg",
                                        cond: { $eq: ["$$msg.isArchived", false] }
                                    }
                                },
                                6
                            ]
                        },
                        totalCount: { $size: "$messages" },
                        unreadCount: {
                            $size: {
                                $filter: {
                                    input: "$messages",
                                    as: "msg",
                                    cond: {
                                        $and: [
                                            { $eq: ["$$msg.isRead", false] },
                                            { $eq: ["$$msg.isArchived", false] }
                                        ]
                                    }
                                }
                            }
                        },
                        todayMessageCount: {
                            $size: {
                                $filter: {
                                    input: "$messages",
                                    as: "msg",
                                    cond: {
                                        $and: [
                                            { $eq: ["$$msg.isRead", false] },
                                            { $eq: ["$$msg.isArchived", false] },
                                            {
                                                $gte: [
                                                    "$$msg.createdAt",
                                                    new Date(new Date().setHours(0, 0, 0, 0))
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            ]).exec();
            if (!updatedUser || updatedUser.length === 0) {
                return Response.json({ success: false, message: "User not found" }, { status: 401 })
            }
            return Response.json({ success: true, messages: updatedUser[0].messages, totalCount: updatedUser[0].totalCount, unreadCount: updatedUser[0].unreadCount, todayMessageCount: updatedUser[0].todayMessageCount }, { status: 200 })
        }
        const updatedUser = await UserModel.aggregate([
            { $match: { _id: userId } },
            {
                $unwind: {
                    path: "$messages",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $sort: { "messages.createdAt": -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } }
        ]).exec();
        if (!updatedUser || updatedUser.length === 0) {
            return Response.json({ success: false, message: "User not found" }, { status: 401 })
        }
        return Response.json({ success: true, messages: updatedUser[0].messages }, { status: 200 })
    } catch (error) {
        console.log("An unexpected Error occured: ", error)
        return Response.json({ success: false, message: "Unexpected Error" }, { status: 500 })
    }


}