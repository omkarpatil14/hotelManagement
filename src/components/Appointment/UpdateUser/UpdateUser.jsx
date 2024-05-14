import { async } from "@firebase/util";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const [update, setUpdate] = useState([]);
  const [date, setDate] = useState(new Date());

  const nav = useNavigate();

  let footer = <p>Please pick a day.</p>;
  if (date) {
    footer = <p className="text-center">You picked {format(date, "PP")}.</p>;
  }

  const { refetch, isLoading } = useQuery(["update", id, update], () =>
    axios
      .get(
        `https://royalerelaxo-server.onrender.com/booking/${id}?email=${user?.email}`
      )
      .then((res) => {
        setUpdate(res.data);
      })
      .catch((err) => console.log(err))
  );

  if (isLoading) {
    return;
  }

  

  const filteredSlots = update?.slotsdata.filter((number) => {
    return number !== update?.slot;
  });

  const filteredtime = update?.timedata.filter((number) => {
    return number !== update?.time;
  });

  const handleForm = (e) => {
    e.preventDefault();

    const slot = e.target.slot.value;
    const time = e.target.time.value;

    const formatDate = format(date, "PP");

    const data = {
      slot: slot,
      time: time,
      date: formatDate,
    };

    axios
      .put(`https://royalerelaxo-server.onrender.com/booking/${id}`, data)
      .then((res) => {
        if (res.data.acknowledged === true) {
          toast.success(
            `Appointment updated room ${slot} time ${time} date ${date}`,
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
          nav("/appointment");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="pt-20 container mx-auto">
      <h1 className="text-center text-2xl font-semibold">
        Update: {user?.email}
      </h1>

      {/* form */}
      <form onSubmit={handleForm} className="mt-10">
        <dl className="flex gap-2 items-center flex-col">
          {/* booking id */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">BookingID</span>
            </label>
            <input
              type="text"
              value={update?.bookingid}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* hotel name */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Hotel Name</span>
            </label>
            <input
              type="text"
              value={update?.hotelName}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {/* date */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="text"
              value={update?.date}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* room */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text mt-3">Update room</span>
            </label>
            <select name="slot" className="select select-success">
              {filteredSlots?.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          {/* time */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text mt-3">Update time</span>
            </label>
            <select name="time" className="select select-success">
              {filteredtime?.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* daypicker */}

          <DayPicker
            className="mt-5"
            mode="single"
            selected={date}
            onSelect={setDate}
            footer={footer}
          />
        </dl>

        <button className="btn hover:btn-info mx-auto block">
          Update Booking
        </button>
      </form>
      {refetch}
    </section>
  );
};

export default UpdateUser;
