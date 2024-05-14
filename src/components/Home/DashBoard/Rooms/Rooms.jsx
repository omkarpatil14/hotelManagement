import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import BookingModal from "./BookingModal/BookingModal";
import auth from "../../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from "date-fns";

const Rooms = ({ date }) => {
  const [rooms, setRoom] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  const formattedDate = format(date, "PP");

  const { isLoading, refetch } = useQuery(["rooms", formattedDate, rooms], () =>
    axios
      .get(
        `https://royalerelaxo-server.onrender.com/available?date=${formattedDate}`
      )
      .then((res) => {
        const roomData = res.data;

        setRoom(roomData);
      })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mt-5">
      <dl className="flex lg:justify-start justify-center flex-wrap gap-5 ml-3 ">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="card w-72  bg-base-100 shadow-xl image-full"
          >
            <figure>
              <img
                className=" w-full object-cover"
                src={room.img}
                alt="room image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{room.hotelName}</h2>
              <p>{room.description}</p>

              <dl className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white text-xl capitalize">
                  <HiOutlineLocationMarker />
                  <h1>{room.location}</h1>
                </div>

                <h1 className="text-green-400">BDT {room.price}</h1>
              </dl>
              <h1 className="text-center mt-2">
                {room.slots.length > 0 ? (
                  <span>{room.slots.length} Room available</span>
                ) : (
                  <span className="text-red-400">No room available</span>
                )}
              </h1>

              <div className="card-actions justify-center mt-5">
                {/* The button to open modal */}
                <label
                  onClick={() => setCheckIn(room)}
                  disabled={room.slots.length === 0 || !user}
                  htmlFor="booking-modal"
                  className="btn btn-primary"
                >
                  Check In
                </label>
              </div>
            </div>
          </div>
        ))}
      </dl>

      {checkIn && (
        <BookingModal
          checkIn={checkIn}
          date={date}
          setCheckIn={setCheckIn}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default Rooms;
