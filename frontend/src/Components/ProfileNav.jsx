import copyToClipBoard from "../Async/copy/copyToClipBoard";
import PrevRoute from "../ui/PrevRoute";

function ProfileNav() {
  const fullURL = window.location.href;
  const { copied } = copyToClipBoard(fullURL);

  function handleCopyLink() {
    copied(fullURL);
  }

  return (
    <div className="w-full md:absolute md:top-4">
      <nav className="flex space-x-5 text-NeonBlue justify-between bg-white  md:p-2 ml-auto mr-auto   md:w-11/12  md:rounded-xl md:border">
        <PrevRoute className="w-1/2 md:w-1/4 lg lg:w-32" to="/linkPage">
          <span>Back to editor</span>
        </PrevRoute>

        <button
          onClick={handleCopyLink}
          className="text-white font-semibold w-1/2 md:w-1/4 lg:w-32 rounded-lg px-2 py-1.5 text-center bg-NeonBlue"
        >
          Share Link
        </button>
      </nav>
    </div>
  );
}

export default ProfileNav;
