import Navbar from "./ui/Navbar";
import Phoneview from "./Components/Phoneview";
import { Outlet } from "react-router-dom";
function Applayout() {
  return (
    <div className="lg:p-4">
      <Navbar />
      <main className="p-3 lg:px-0 lg:flex lg:justify-between">
        <Phoneview/>
        <Outlet />
      </main>
    </div>
  )
}

export default Applayout;
