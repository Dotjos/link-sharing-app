import PrevRoute from "../ui/PrevRoute";

function ProfileNav() {
  return (
    <div className="w-full md:absolute md:top-4">
      <nav className="flex text-NeonBlue justify-between bg-white  md:p-2 ml-auto mr-auto   md:w-11/12  md:rounded-xl md:border">
        <PrevRoute to="/linkPage">
          <span>Back to editor</span>
        </PrevRoute>
        <PrevRoute to="/linkPage" share={true}>
          <span>Share Link</span>
        </PrevRoute>
      </nav>
    </div>
  );
}

export default ProfileNav;
