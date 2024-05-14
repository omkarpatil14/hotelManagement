import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "../SocialSignIn/GoogleSignIn";
import logo from "../../../assets/Hotel_Logo.png";
import auth from "../../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useRef } from "react";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);

  const [token] = useToken(user || googleUser);

  const emailRef = useRef("");
  const passRef = useRef("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pass = passRef.current.value;

    await signInWithEmailAndPassword(email, pass);

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (user) {
      toast.success(`Welcome ${user?.user?.email}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    }
  };

  return (
    <section className="pt-10">
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="login image"
              src="https://images.unsplash.com/photo-1537572263231-4314a30d444f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <Link className="block text-blue-600" to="/">
                <span className="sr-only">Home</span>
                <img
                  className="w-40 mx-auto block bg-cover bg-center bg-no-repeat"
                  src={logo}
                  alt=""
                />
              </Link>

              <h1 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
                Welcome to RoyaleRelaxo 🛎
              </h1>

              {/* form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                {/* email */}
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    ref={emailRef}
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 px-2 py-2 w-full rounded-md border-gray-200 bg-white   shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* password */}
                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>

                  <input
                    ref={passRef}
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 px-2 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="btn inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                    Login
                  </button>

                  <p className="mt-4 text-sm  sm:mt-0 text-gray-500 dark:text-gray-400">
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="underline ml-2 text-gray-700 dark:text-gray-200"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
              <div className="divider">OR</div>
              <GoogleSignIn
                signInWithGoogle={signInWithGoogle}
                loading={loading}
                googleUser={googleUser}
                useSignInWithGoogle={useSignInWithGoogle}
              />
            </div>
          </main>
        </div>
      </section>
    </section>
  );
};

export default Login;
