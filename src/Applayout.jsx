import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

function Applayout() {
  return (
    <div className="">
      <Navbar />
      <main className="p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Applayout;
