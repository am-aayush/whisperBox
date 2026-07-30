import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOption)
    const user: User  = session?.user as User

    if(!session || !session.user){
        return Response.json({success:false,message:"Not Authenticated"},{status:401})
    }

    const userId = user._id;
    const {acceptMessages} =  await request.json()
    

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{isAcceptingMessage:acceptMessages},{new:true})
        if(!updatedUser){
            return Response.json({success:false,message:"Failed to update user status"},{status:401})
        }else{
            
            return Response.json({success:true,message:"User status changed successfully"},{status:200})
        }
        
    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({success:false,message:"Failed to update user status to accept messages"},{status:500})
    }
}

export async function GET(request:Request) {
     await dbConnect()

    const session = await getServerSession(authOption)
    const user: User  = session?.user as User

    if(!session || !session.user){
        return Response.json({success:false,message:"Not Authenticated"},{status:401})
    }
    const userId = user._id;
  try {
      const foundUser = await UserModel.findById(userId)  
      if(!foundUser){
          return Response.json({success:false,messgae:"User not Found"},{status:404})
      }  
      return Response.json({success:true,message:"User Found",isAcceptingMessage:foundUser.isAcceptingMessage},{status:200})
  } catch (error) {
      console.log("Faild to get User")
      return Response.json({success:false,message:"Error in getting Message acceptance status"},{status:500})    
  }
}