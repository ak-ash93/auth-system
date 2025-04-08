import dbconnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
