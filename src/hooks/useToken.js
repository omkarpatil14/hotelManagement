import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };

    if (email) {
      axios
        .put(`https://royalerelaxo-server.onrender.com/user/${email}`, {
          currentUser,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return [token];
};

export default useToken;
