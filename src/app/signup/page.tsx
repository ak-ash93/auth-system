"use client";

// Import necessary libraries and hooks
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// React component for the signup page
export default function SignupPage() {
  const router = useRouter(); // Used to navigate to different pages

  // Store user input values (username, email, password)
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // State to handle if the submit button should be disabled
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // State to track if the signup is processing
  const [loading, setLoading] = React.useState(false);

  // Runs whenever user input changes to check if all fields are filled
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false); // Enable button if all fields have values
    } else {
      setButtonDisabled(true); // Disable button if any field is empty
    }
  }, [user]);

  // Function that runs when the "Signup" button is clicked
  const onSignUp = async () => {
    try {
      setLoading(true); // Start loading

      // Send user data to backend signup API
      const response = await axios.post("/api/users/signup", user);

      console.log("Signup success", response.data);

      // Navigate to the login page after successful signup
      router.push("/login");
    } catch (error: unknown) {
      // If there is an error during signup
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message); // Show error message in toast
      } else {
        console.log("Unexpected error", error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // The UI structure of the signup page
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="flex flex-col gap-2 w-1/3">
        {/* Page title */}
        <h1 className="text-3xl text-white text-center mb-10 uppercase">
          {loading ? "Processing" : "Sign Up"}
        </h1>

        {/* Username input field */}
        <div className="flex items-center p-5">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 w-full border border-gray-300 text-white rounded-lg ml-2 focus:outline-none focus:border-gray-600"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
        </div>

        {/* Email input field */}
        <div className="flex items-center p-5">
          <label className="mr-8" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 text-white w-full border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
        </div>

        {/* Password input field */}
        <div className="flex items-center p-5">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 text-white border w-full border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        {/* Signup button */}
        <button
          onClick={onSignUp}
          className="p-2 m-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer"
        >
          {buttonDisabled ? "Enter Details" : "Signup"}
        </button>

        {/* Link to login page if user already has an account */}
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-sm">Already have an account</h5>
          <Link
            className="p-2 text-lg text-white hover:text-blue-600 hover:underline cursor-pointer"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
