import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Shared/Nav/Nav";
import { useState } from "react";
import Home from "./components/Home/Home";
import "react-day-picker/dist/style.css";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appointment from "./components/Appointment/Appointment";
import RequiredAuth from "./components/Auth/RequireAuth/RequireAuth";
import UpdateUser from "./components/Appointment/UpdateUser/UpdateUser";
import Admin from "./components/Admin/Admin";
import AllUsers from "./components/Admin/AllUsers/AllUsers";
import AddContent from "./components/Admin/AddContent/AddContent";
import ListContent from "./components/Admin/ListContent/ListContent";

function App() {
  const [dark, setDark] = useState(false);
  return (
    <div data-theme={dark ? "corporate" : "night"} className="App">
      <Nav setDark={setDark} dark={dark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/appointment"
          element={
            <RequiredAuth>
              <Appointment />
            </RequiredAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <Admin />
            </RequiredAuth>
          }
        >
          <Route index element={<AllUsers />} />
          <Route path="addcontent" element={<AddContent />} />
          <Route path="listcontent" element={<ListContent />} />
        </Route>

        <Route
          path="/updateUser/:id"
          element={
            <RequiredAuth>
              <UpdateUser />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
