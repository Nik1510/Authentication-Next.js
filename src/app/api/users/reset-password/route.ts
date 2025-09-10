import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }
    if (!password || password.trim().length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Optional: add composition checks to mirror client rules
    // if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    //   return NextResponse.json({ message: "Use upper, lower, and a number" }, { status: 400 });
    // }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { forgotPasswordToken: "", forgotPasswordExpiry: "" },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
