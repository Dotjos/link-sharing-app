import { NavLink } from "react-router-dom";

function NavRoutes({ children, to }) {
  return (
    <NavLink to={to} className="flex gap-2 py-2 px-1 ">
      {children}
    </NavLink>
  );
}

export default NavRoutes;
