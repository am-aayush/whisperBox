import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {

    await dbConnect()

    try {
        const {username,code} = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({success:false,message:"User not Found"},{status:401})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json({success:true,message:"Account Verified Succesfully"},{status:200})
        }else if(!isCodeNotExpired){            
            return Response.json({success:false,message:"Verification Code is Expired, Please Signup Again to Get a New Code"},{status:400})
        }else {
            
            return Response.json({success:false,message:"Verification Code is Invalid"},{status:400})
        }

    } catch (error) {
         console.error("Error Verifying User", error);
        return Response.json(
            { success: false, message: "Error Verifrying User" },
            { status: 500 },
        );
    }

}