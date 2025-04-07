import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB database connection established successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB database connection error");
      console.error(err);
      process.exit(1);
    });
  } catch (error) {
    const err = error as Error;
    console.log("Something went wrong");
    console.error(err.message ?? err);
  }
};

export default dbconnect;
