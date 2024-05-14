import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const GoogleSignIn = ({ signInWithGoogle, loading, googleUser }) => {
  const nav = useNavigate();

 

  if (googleUser) {
    toast.success(`${googleUser?.user?.displayName} Logged In`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    nav("/");
  }

  return (
    <button
      onClick={() => signInWithGoogle()}
      className="flex items-center gap-2 justify-center mt-5 ring-2 ring-sky-500 text-white p-3 rounded-md cursor-pointer hover:ring-neutral-content w-full"
    >
      <FcGoogle className="text-2xl" />
      <h1>Continue with google</h1>
    </button>
  );
};

export default GoogleSignIn;
