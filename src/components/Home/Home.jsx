import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Dashboard from "./DashBoard/DashBoard";
import { CgMenuRound } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <section className="pt-10">
      <Splide
        aria-label="hotel header image"
        options={{
          type: "loop",
          autoplay: true,
          arrows: false,
        }}
      >
        <SplideSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80")`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Find the best <span className="text-yellow-400">hotel</span>{" "}
                  deals
                </h1>

                <Link to="/appointment">
                  <button className="btn btn-primary">
                    Book a appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Find the best <span className="text-yellow-400">hotel</span>{" "}
                  deals
                </h1>

                <Link to="/appointment">
                  <button className="btn btn-primary">
                    Book a appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Find the best <span className="text-yellow-400">hotel</span>{" "}
                  deals
                </h1>

                <Link to="/appointment">
                  <button className="btn btn-primary">
                    Book a appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>

      <h1 className="text-center text-4xl font-semibold mt-7">Book a room</h1>

      <h1 className="text-center mt-2">
        Available appointment on : {format(date, "PP")}
      </h1>
      {/* sidebar */}
      <label
        onClick={() => setSidebar(!sidebar)}
        htmlFor="sidebar"
        className="text-3xl drawer-button lg:hidden"
      >
        <div className="flex gap-3 items-center justify-center my-5 ">
          {sidebar ? (
            <AiOutlineClose className="btn-sm btn-error btn-circle " />
          ) : (
            <CgMenuRound className="btn-sm btn-success btn-circle " />
          )}
          {<h1 className="text-xl">{sidebar ? "Hide" : "Show"} sidebar</h1>}
        </div>
      </label>

      <Dashboard date={date} setDate={setDate} />
    </section>
  );
};

export default Home;
