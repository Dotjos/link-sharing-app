import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

function Applayout() {
  return (
    <div className="lg:p-4">
      <Navbar />
      <main className="p-3 lg:px-0">
        
        <Outlet />
      </main>
    </div>
  );
}

export default Applayout;
