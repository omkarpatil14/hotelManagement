import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../SocialSignIn/GoogleSignIn";
import logo from "../../../assets/Hotel_Logo.png";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useRef } from "react";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-toastify";
import useToken from "../../../hooks/useToken";

const Registration = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);

  const [token] = useToken(user || googleUser);

  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");

  const navigation = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (pass !== confirmPass) {
      toast.warn("Email & Password Didn't Match", {
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
    } else {
      await createUserWithEmailAndPassword(email, pass);
      toast.success("Account Created", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigation("/");
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="signup image"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <Link className="block text-white" to="/">
                <span className="sr-only">Home</span>
                <img className="w-40 mx-auto" src={logo} alt="" />
              </Link>

              <h1 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
                Welcome to RoyaleRelaxo 🛎
              </h1>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <Link
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-gray-900 sm:h-20 sm:w-20"
                  to="/"
                >
                  <span className="sr-only">Home</span>
                  <img className="" src={logo} alt="" />
                </Link>

                <h1 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl text-gray-900 dark:text-white">
                  Welcome to RoyaleRelaxo 🛎
                </h1>
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                {/* email */}
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>

                  <input
                    ref={emailRef}
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 px-2 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                {/* password */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
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

                {/* confirm password */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password Confirmation
                  </label>

                  <input
                    ref={confirmPassRef}
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="mt-1 px-2 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-gray-700 underline dark:text-gray-200 ml-2"
                    >
                      Log in
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
    </div>
  );
};

export default Registration;
