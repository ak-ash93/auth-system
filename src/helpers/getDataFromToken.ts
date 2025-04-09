import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
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
