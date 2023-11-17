import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashBoard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DashBoard;
