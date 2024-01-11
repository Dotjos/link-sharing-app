import { NavLink } from "react-router-dom";
import NavRoutes from "./NavRoutes";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 border rounded-b-xl items-center ">
      <div>
        <img src="logo-devlinks-small.svg" className="md:hidden" />
        <img src="logo-devlinks-large.svg" className="hidden md:inline-block" />
      </div>
      <div className="flex gap-7">
        <NavRoutes to="/">
          <img src="icon-links-header.svg" />
          <span className="hidden md:inline-block">Links</span>
        </NavRoutes>
        <NavRoutes to="/profilePage">
          <img src="icon-profile-details-header.svg" alt="" />
          <span className="hidden md:inline-block">ProfileDetails</span>
        </NavRoutes>
      </div>

      <NavLink
        to="/previewPage"
        className="rounded-lg  border-NeonBlue border py-2 px-3"
      >
        <img src="icon-preview-header.svg" className="md:hidden" />
        <span className="hidden md:inline-block">Preview</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
