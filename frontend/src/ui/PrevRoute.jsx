import { NavLink } from "react-router-dom";

function PrevRoute({ to, children, share, className }) {
  return (
    <NavLink
      to={to}
      className={`border ${className} border-NeonBlue rounded-lg px-2 py-1.5 text-center ${
        share ? "bg-NeonBlue text-whiteFA" : ""
      }`}
    >
      {children}
    </NavLink>
  );
}

export default PrevRoute;
