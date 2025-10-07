import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "../../Components/SaveButton";
import StartLnkPage from "../../Components/StartLnkPage";
import AddLink from "../../Components/AddLink";
import RealSpinner from "../../Components/RealSpinner";
import { generateRandomId } from "../../utilis/generateId";
import { setUserData, saveLinkBatch } from "../../Store/LinkDetailsSlice";
import getCurrentAccountAuth from "../../Async/getCurrentAccountAuth";
import useSaveLinkData from "../../Database/useSaveLinkData";
import useFetchUserData from "../../Database/useFetchUserData";
import { platformDetails } from "../../utilitis/LinkInfo";

function Page() {
  const dispatch = useDispatch();

  // 🟦 Local state for temporary link management
  const [localLinks, setLocalLinks] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  // 🟩 Auth + DB hooks
  const { user } = getCurrentAccountAuth();
  const id = user?.id;
  const { userData, status } = useFetchUserData(id);
  const { saveLinkDB, saveLinkStatus } = useSaveLinkData();

  // 🧭 Load user data into local state
  useEffect(() => {
    if (status === "success" && userData?.linkdetails) {
      setLocalLinks(userData.linkdetails);
      dispatch(setUserData(userData.linkdetails));
    }
  }, [status, userData, dispatch]);

  // 🧱 Handlers
  const handleAddLink = () => {
    const newLink = {
      linkId: generateRandomId(),
      details: {},
    };
    setLocalLinks((prev) => [...prev, newLink]);
    setIsDirty(true);
  };

  const handleDeleteLink = (linkId) => {
    setLocalLinks((prev) => prev.filter((link) => link.linkId !== linkId));
    setIsDirty(true);
  };

  const handleUpdateLink = (linkId, updatedDetails) => {
    setLocalLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.linkId === linkId
          ? { ...link, details: { ...link.details, ...updatedDetails } }
          : link
      )
    );
    setIsDirty(true);
  };

  const validateLink = (selectedPlatform, link) => {
    console.log(selectedPlatform);
    // Handle empty input
    if (!link || link.trim() === "") {
      // setError("Link cannot be empty.");
      return "Link cannot be empty.";
    }

    // Find platform in platformDetails
    const platformData = platformDetails.find(
      (p) =>
        p.platform.toLowerCase() === selectedPlatform?.platform.toLowerCase()
    );

    // Validate link using the platform's regex
    if (!platformData.platFormat.test(link)) {
      // setError("Invalid URL.");
      return `Invalid ${platformData.platform} URL.`;
    }

    return ""; // ✅ No error — valid link
  };

  const handleSave = () => {
    const updated = localLinks.map((link) => {
      const error = validateLink(link.details.platform, link.details.linkInput);
      return { ...link, details: { ...link.details, error } };
    });

    setLocalLinks(updated);

    const hasError = updated.some((link) => link.details.error);
    if (hasError) return; // ❌ stop saving
    console.log("Saving:", updated);

    dispatch(saveLinkBatch(updated));
    // saveLinkDB({ id, linkdetails: updated });
    setIsDirty(false);
  };

  // 🧩 Render
  // if (status === "pending") return <RealSpinner />;

  return (
    <div className="lg:w-7/12 text-sm text-Nickel bg-white rounded-lg">
      <div className="border-b w-full p-6 md:px-6 h-screen overflow-y-auto md:pt-10 md:pb-7">
        <h1 className="font-bold text-xl text-DarkCharcoal">
          Customize your links
        </h1>
        <p className="text-sm mb-3">
          Add, edit, or remove links below and share all your profiles with the
          world!
        </p>

        <button
          className="my-3 w-full border-NeonBlue p-2 border rounded-lg text-NeonBlue"
          onClick={handleAddLink}
        >
          + Add new link
        </button>

        <div>
          {localLinks.length === 0 && <StartLnkPage />}
          {localLinks.length > 0 &&
            localLinks.map((link, index) => (
              <AddLink
                key={link.linkId}
                linkNum={index}
                linkData={link}
                linkId={link.linkId}
                onDelete={() => handleDeleteLink(link.linkId)}
                onUpdate={handleUpdateLink}
              />
            ))}
        </div>
      </div>

      <div className="p-5 flex justify-end">
        <SaveButton
          onClick={handleSave}
          disabled={saveLinkStatus === "pending" || !isDirty}
          small={true}
          notTooSmall={true}
          text={saveLinkStatus === "pending" ? "Saving..." : "Save"}
        />
      </div>
    </div>
  );
}

export default Page;
