import dbconnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
dbconnect();

// Handle POST request for user login
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body from the request
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Find user by email in the database
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Compare provided password with stored hashed password
    const validPassword = await bcryptjs.compare(password, user.password);

    // If password is incorrect, return error
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create data to be included in the JWT token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate JWT token with 1-day expiration
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Create response with success message
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set token in an HTTP-only cookie (not accessible from JavaScript)
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
