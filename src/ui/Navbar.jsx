import { NavLink } from "react-router-dom";
import NavRoutes from "./NavRoutes";
import { LuLink } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 border rounded-b-xl lg:rounded-xl items-center bg-white ">
      <div>
        <img src="logo-devlinks-small.svg" className="md:hidden" />
        <img src="logo-devlinks-large.svg" className="hidden md:inline-block" />
      </div>
      <div className="flex gap-7">
        <NavRoutes to="/linkPage">
          <LuLink />
          <span className="hidden md:inline-block">Links</span>
        </NavRoutes>
        <NavRoutes to="/profilePage">
          <MdOutlineAccountCircle />
          <span className="hidden md:inline-block">ProfileDetails</span>
        </NavRoutes>
      </div>

      <NavLink
        to="/previewPage"
        className="rounded-lg  border-NeonBlue border py-2 px-3 hover:text-NeonBlue "
      >
        <img src="icon-preview-header.svg" className="md:hidden hover:bg-MaximumBluePurple" />
        <span className="hidden md:inline-block">Preview</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
