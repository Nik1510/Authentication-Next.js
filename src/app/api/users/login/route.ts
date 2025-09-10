import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
       const reqBody = await  request.json();

       const {email,password} = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" }, 
                { status: 400 }
            );
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" }, 
                { status: 400 }
            );
        }
        console.log(reqBody);

        // check if the User
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User doesnot exists"},{status:400})
        }

        // check if password is correct;
        const validPassoword = await bcryptjs.compare(password,user.password);
        if(!validPassoword){
           return NextResponse.json({error:"Invalid Password"},{status:401})
        }

        // Create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        // create token 
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Login successfully",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;

    } catch (error:unknown) {
        const errorMessage = typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error);
        return NextResponse.json({error: errorMessage},{status:500})
    }
}