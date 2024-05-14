import { useEffect } from "react";
import { useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const email = user?.email;

    if (email) {
      fetch(`https://royalerelaxo-server.onrender.com/user/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data);
          setLoad(false);
        });
    }
  }, [user]);

  return [admin, load];
};

export default useAdmin;
