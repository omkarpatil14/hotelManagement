import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const { isLoading, refetch } = useQuery(["appointment", appointments], () =>
    axios
      .get(
        `https://royalerelaxo-server.onrender.com/booking?email=${user?.email}`
      )
      .then((res) => {
        const appointmentData = res.data;

        setAppointments(appointmentData);
      })
  );

  

  const handleDelete = (e) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const url = `https://royalerelaxo-server.onrender.com/booking/${e}`;

      axios
        .delete(url)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="pt-20 container mx-auto h-screen ">
      <h1 className="text-center text-4xl font-semibold mb-3">
        My Appointments
      </h1>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Hotel Name</th>
              <th>Date</th>
              <th>Room</th>
              <th>Time</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <th>{index + 1}</th>
                <td>{appointment.hotelName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.time}</td>
                <td>{appointment.price} BDT</td>
                <td className="cursor-pointer ">
                  <Link to={`/updateUser/${appointment._id}`}>
                    <FiEdit className="hover:text-blue-500 text-2xl" />
                  </Link>
                </td>
                <td className="cursor-pointer text-2xl">
                  <MdDelete
                    onClick={() => handleDelete(appointment._id)}
                    className="hover:text-red-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {refetch}
    </section>
  );
};

export default Appointment;
