import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URL: string = "";

  if (process.env.NODE_ENV === "production") {
    DB_URL = process.env.DB_URL!;
  } else {
    DB_URL = process.env.DB_LOCAL_URL!;
  }

  await mongoose.connect(DB_URL);
};

export default dbConnect;
