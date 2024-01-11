import { NavLink } from "react-router-dom";

function NavRoutes({ children, to }) {
  return (
    <NavLink
      to={to}
      className="flex gap-2 py-2 px-1 font-medium items-center hover:text-NeonBlue transition-all"
    >
      {children}
    </NavLink>
  );
}

export default NavRoutes;
