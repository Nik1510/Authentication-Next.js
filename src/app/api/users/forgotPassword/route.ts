import {connect} from'@/dbConfig/dbConfig'
import { NextResponse,NextRequest } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import crypto from 'crypto'

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
    
        const {email} =reqBody;
        if(!email){
            return NextResponse.json({message:"Please enter the email"},{status:400});
        }
        
    
        const user = await User.findOne({email:email});
    
        if (!user) {
        return NextResponse.json(
            { message: 'If the email exists, a reset link has been sent', success: true },
            { status: 200 }
        );
        }
    
       
        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(rawToken,10);
        const expiry =Date.now()+60*60*1000;
    
        user.forgotPasswordToken =hashedToken;
        user.forgotPasswordExpiry =expiry;
        await user.save();

        await sendEmail({ email, emailType: 'RESET', userId: user._id });
        return NextResponse.json({
            message:"Password updated successfully",
            success:true,
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}