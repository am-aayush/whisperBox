import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { success, z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

//localhost:3000/api/check-username-unique?username=aayush?phone=android
export async function GET(request: Request) {
    // Not needed in next js newer version
    // if(request.method !== 'GET'){
    //     return Response.json({success:false,message:"Only GET method is allowed on this route"},{status:405})
    // }

    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        };
        //validation with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(", ")
                            : "Invalid Query Parameters",
                },
                { status: 401 },
            );
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if(existingVerifiedUser){
            return Response.json({success:false,message:"Username is Already Taken"},{status:400})
        }
        return Response.json({success:true,message:"Username is Available"},{status:201})
    } catch (error) {
        console.error("Error Checking Username", error);
        return Response.json(
            { success: false, message: "Error while checking username" },
            { status: 500 },
        );
    }
}
