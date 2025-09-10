import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig"; // your cached connection helper

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const user = await User.findById(params.id)
      .select("username email isVerified isAdmin createdAt")
      .lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: { ...user, _id: String(user._id) } });
  } catch (e: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
