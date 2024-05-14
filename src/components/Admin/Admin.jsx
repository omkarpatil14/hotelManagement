import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CgMenuRound } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";

const Admin = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="drawer drawer-mobile pt-20">
      <input id="admindrawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* <!-- Page content here --> */}
        <label
          onClick={() => setSidebar(!sidebar)}
          htmlFor="admindrawer"
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
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="admindrawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/admin">All User</Link>
          </li>
          <li>
            <Link to="addcontent">Add Content</Link>
          </li>
          <li>
            <Link to="listcontent">List Content</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
