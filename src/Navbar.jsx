import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <img src="logo-devlinks-large.svg" />
        <img src="logo-devlinks-small.svg" />
      </NavLink>
      <div>
        <NavLink to=""></NavLink>
        <NavLink to=""></NavLink>
      </div>
      <NavLink to=""></NavLink>
    </nav>
  );
}

export default Navbar;
