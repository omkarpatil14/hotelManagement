import axios from "axios";
import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const { isLoading, refetch } = useQuery("users", () =>
    axios("https://royalerelaxo-server.onrender.com/user")
      .then((res) => {
        const data = res.data;
        setUsers(data);
      })
      .catch((err) => console.log(err))
  );

  if (isLoading) {
    return <Loading />;
  }

  const makeAdmin = (email) => {
    axios
      .put(`https://royalerelaxo-server.onrender.com/user/admin/${email}`)
      .then((res) => {
        if (res.data) {
          toast.success("Admin added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        {
          refetch;
        }
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const url = `https://royalerelaxo-server.onrender.com/user/${id}`;

      axios
        .delete(url)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="h-screen container mx-auto ">
      <h1 className="text-center text-4xl mb-3 font-semibold">All User</h1>
      <h1>Users: {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Admin</th>
              <th>Remove user</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs"
                      onClick={() => makeAdmin(user.email)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <MdDelete
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                    className="text-xl hover:text-red-400 hover:cursor-pointer"
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

export default AllUsers;
