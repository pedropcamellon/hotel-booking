import Room from "../server/models/room.model";
import mongoose from "mongoose";
import {rooms} from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    await Room.deleteMany();

    console.log("Rooms are deleted");

    await Room.insertMany(rooms);

    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
