import { NavLink } from "react-router-dom";

function ProfileNav() {
  return (
    <div className="w-full md:absolute md:top-4">
      <nav className="flex justify-between bg-white  md:p-2 ml-auto mr-auto   md:w-11/12  md:rounded-xl md:border">
        <NavLink to="/" className="border border-NeonBlue rounded-lg px-4 py-1">
          Back to editor
        </NavLink>
        <NavLink className="border rounded-lg px-4 border-NeonBlue py-1 bg-NeonBlue text-white">
          Share Link
        </NavLink>
      </nav>
    </div>
  );
}

export default ProfileNav;
