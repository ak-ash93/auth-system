"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = React.useState("");
  useEffect(() => {
    const links = document.querySelectorAll(".hover-link");

    links.forEach((link) => {
      const underline = link.querySelector(".underline");

      if (!underline) return;

      gsap.set(underline, { width: "0%" });

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { width: "100%", duration: 1 });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { width: "0%", duration: 0.3 });
      });
    });
  }, []);

  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message); // Show error message in toast
      } else {
        console.log("Unexpected error", error);
        toast.error("Something went wrong");
      }
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    console.log(res.data.data);
    setData(res.data.data);
  };

  return (
    <div className="max-w-screen h-screen bg-white text-gray-500">
      <div className="w-[80vw] h-[8vh] translate-x-40 p-5 flex justify-between items-center border-b-2 border-gray-300 rounded-2xl">
        <div className="w-[80px] h-[30px] font-extrabold text-gray-400">
          SHERwell
        </div>
        <div className="flex items-center gap-6">
          {["About", "Contact", "News"].map((text) => (
            <a
              key={text}
              className="hover-link relative p-4  text-lg font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              {text}
              <div className="underline absolute left-0 bottom-0 h-0.5 bg-black w-0" />
            </a>
          ))}
          <button
            onClick={logOut}
            className="bg-blue-400 px-5 py-1 text-sm font-semibold rounded-lg text-white hover:bg-red-400 cursor-pointer"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="bg-blue-400 px-5 py-1 text-sm font-semibold rounded-lg text-white hover:bg-red-400 cursor-pointer"
          >
            user details
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-full">
        <h1 className="text-8xl bg-amber-300 p-10">
          {data === "" ? (
            "No user Found"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h1>
      </div>
    </div>
  );
}
