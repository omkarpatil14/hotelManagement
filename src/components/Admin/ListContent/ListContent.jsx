import axios from "axios";
import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useQuery } from "react-query";

const ListContent = () => {
  const [services, setServices] = useState([]);

  const { isLoading, refetch } = useQuery("listcontent", () =>
    axios
      .get("https://royalerelaxo-server.onrender.com/services")
      .then((res) => {
        setServices(res.data);
      })
  );

  if (isLoading) {
    return;
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const url = `https://royalerelaxo-server.onrender.com/services/${id}`;

      axios.delete(url).then((res) => {
        console.log(res.data);
        refetch;
      });
    }
  };

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {services.map((service, index) => (
              <tr key={service._id}>
                <th>{index + 1}</th>
                <td>{service.hotelName}</td>
                <td>{service.location}</td>
                <td>{service.price} BDT</td>
                <td>
                  <MdDelete
                    onClick={() => handleDelete(service._id)}
                    className="text-2xl hover:text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListContent;
