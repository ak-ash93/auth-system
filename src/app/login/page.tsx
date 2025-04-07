"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function loginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="flex flex-col gap-2  w-1/3 ">
        <h1 className="text-3xl text-white  text-center mb-10 uppercase">
          Login
        </h1>

        <div className="flex items-center p-5  ">
          <label className="mr-8" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 w-full  border border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
        </div>
        <div className="flex items-center p-5  ">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border w-full border-gray-300 rounded-lg ml-2 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
        </div>

        <button
          onClick={onLogin}
          className="p-2 m-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer"
        >
          Submit
        </button>
        <div className="flex flex-col justify-center items-center">
          <h5 className="text-sm">Create an account</h5>
          <Link
            className="p-2  text-lg text-white hover:text-blue-600 hover:underline cursor-pointer"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
