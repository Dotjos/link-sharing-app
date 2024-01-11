import { NavLink } from "react-router-dom";

function PrevRoute({ to, children, share }) {
  return (
    <NavLink
      to={to}
      className={`border border-NeonBlue  rounded-lg px-4 py-2 text-center ${
        share ? "bg-NeonBlue text-whiteFA" : ""
      }`}
    >
      {children}
    </NavLink>
  );
}

export default PrevRoute;
