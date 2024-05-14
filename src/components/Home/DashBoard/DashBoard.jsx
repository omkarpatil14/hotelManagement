import React from "react";
import DashBoardContent from "./DashBoardContent/DashBoardContent";
import Rooms from "./Rooms/Rooms";

const Dashboard = ({ date, setDate }) => {
  return (
    <div className="drawer drawer-mobile ">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* <!-- Page content here --> */}
        <Rooms date={date} />
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 lg:w-80 w-4/5 bg-base-100 text-base-content ">
          {/* <!-- Sidebar content here --> */}
          <DashBoardContent date={date} setDate={setDate} />
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
