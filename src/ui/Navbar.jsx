import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 border rounded-b-xl items-center">
      <NavLink to="/">
        <img src="logo-devlinks-small.svg" className="md:hidden" />
        <img src="logo-devlinks-large.svg" className="hidden md:inline-block" />
      </NavLink>
      <div className="flex gap-7">
        <NavLink to="" className="flex gap-2">
          <img src="icon-links-header.svg" />
          <span className="hidden md:inline-block">Links</span>
        </NavLink>
        <NavLink to="/profilePage" className="flex gap-2">
          <img src="icon-profile-details-header.svg" alt="" />
          <span>ProfileDetails</span>
        </NavLink>
      </div>
      <NavLink to="" className="rounded-lg border-Neon Blue border py-2 px-3">
        <img src="icon-preview-header.svg" />
      </NavLink>
    </nav>
  );
}

export default Navbar;
