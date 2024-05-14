import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQuery } from "react-query";

const BookingModal = ({ checkIn, date, setCheckIn, refetch }) => {
  const { _id, hotelName, location, price, slots, time } = checkIn;
  const [user, loading, error] = useAuthState(auth);
  const [services, setServices] = useState([]);

  const { isLoading } = useQuery("services", () =>
    axios
      .get("https://royalerelaxo-server.onrender.com/services/")
      .then((res) => setServices(res.data))
  );

  if (isLoading) {
    return;
  }

  const handleBooking = (e) => {
    e.preventDefault();

    const slot = e.target.slot.value;
    const phone = e.target.phone.value;
    const time = e.target.time.value;

    const formatDate = format(date, "PP");

    axios
      .post("https://royalerelaxo-server.onrender.com/booking", {
        bookingid: _id,
        hotelName: hotelName,
        userName: user.displayName,
        email: user.email,
        date: formatDate,
        phone,
        slot,
        time,
        price,
        location,
        slotsdata: services[0]?.slots,
        timedata: services[0]?.time,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(`Room ${slot} is set at ${time}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(
            `You already booked room ${slot} already booked at ${time}`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
        console.log(res);
      })
      .catch((err) => console.log(err));

    refetch();

    setCheckIn(null);
  };

  return (
    <section>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-blue-500 text-center">
            {hotelName}
          </h3>
          {/* form */}
          <form onSubmit={handleBooking} className="mt-5 ">
            {/* name */}
            <input
              type="text"
              value={user?.displayName}
              disabled
              placeholder="Name"
              required
              className="input input-bordered w-full "
            />
            {/* email */}
            <input
              type="email"
              value={user?.email}
              disabled
              placeholder="Email"
              required
              className="input input-bordered w-full mt-3"
            />
            {/* phone */}
            <input
              name="phone"
              type="tel"
              placeholder="Contract Number"
              required
              className="input input-bordered w-full mt-3"
            />

            {/* date */}
            <input
              type="text"
              value={format(date, "PP")}
              disabled
              className="input input-bordered w-full mt-3"
            />

            {/* room */}
            <label className="label">
              <span className="label-text mt-3">Pickup a room</span>
            </label>
            <select name="slot" className="select select-success w-full ">
              {slots?.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {/* time */}
            <label className="label">
              <span className="label-text mt-3">Pickup a time</span>
            </label>
            <select name="time" className="select select-success w-full ">
              {time?.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <button className="btn btn-info mt-6 mx-auto block w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingModal;
