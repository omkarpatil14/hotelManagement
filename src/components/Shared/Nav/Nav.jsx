import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import Theme from "../../Theme/Theme";
import Loading from "../Loading/Loading";

const Nav = ({ setDark, dark }) => {
  let navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const [signOut] = useSignOut(auth);

  if (loading) {
    return <Loading />;
  }

  const handleSignOut = async () => {
    const success = await signOut();

    if (success) {
      toast.success("Logged Out", {
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
  };

  return (
    <nav className="navbar bg-base-100 fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/appointment">Appointment</Link>
            </li>

            {admin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <button>RoyaleRelaxo</button>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/appointment">Appointment</Link>
          </li>

          {admin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <Theme setDark={setDark} dark={dark} />
        <div className="dropdown dropdown-end pl-5">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user ? (
                <img src={user?.photoURL} alt="" />
              ) : (
                <img src="https://placeimg.com/80/80/people" />
              )}
            </div>
          </label>

          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <h1>{user?.displayName}</h1>
            </li>
            <li>
              <h1>{user?.email}</h1>
            </li>
            <li>
              {user ? (
                <button onClick={handleSignOut}>Sign Out</button>
              ) : (
                <Link to="/login">SignIn</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
