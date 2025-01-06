"use client";

import { useSearchParams } from "next/navigation";

import React from "react";

import { IRoom } from "@/server/models/room.model";
import Banner from "./Banner";
import Rooms from "./room/Rooms";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}
const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const guest = searchParams.get("guestCapacity");
  const category = searchParams.get("category");
  return (
    <div>
      {location || guest || category ? <div></div> : <Banner />}

      {data && <Rooms data={data} />}
    </div>
  );
};

export default Home;
