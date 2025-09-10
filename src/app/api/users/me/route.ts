import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";


connect();
export async function GET(request:NextResponse) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id:userId}).select("-password ");
        return NextResponse.json({message:"User Found",data:user})

    } catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Server error";
  return NextResponse.json({ error: message }, { status: 500 });
}

}