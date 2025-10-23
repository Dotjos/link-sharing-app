import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "../../Components/SaveButton";
import StartLnkPage from "../../Components/StartLnkPage";
import AddLink from "../../Components/AddLink";
import RealSpinner from "../../Components/RealSpinner";
import { generateRandomId } from "../../utilis/generateId";
import { setUserLinkData, saveLinkBatch } from "../../Store/LinkDetailsSlice";
import getCurrentAccountAuth from "../../Async/getCurrentAccountAuth";
import useSaveLinkData from "../../Hooks/useSaveLinkData";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { platformDetails } from "../../utilitis/LinkInfo";
import { updateProfileDetails } from "../../Store/ProfileDetailsSlice";

function Page() {
  const dispatch = useDispatch();
  // 🟦 Local state for temporary link management
  const [localLinks, setLocalLinks] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  console.log(localLinks);
  // 🟩 Auth + DB hooks
  const { user } = getCurrentAccountAuth();
  const id = user?.id;
  console.log(id);
  const { userData, status } = useFetchUserData(id);
  const { saveLinkDB, saveLinkStatus } = useSaveLinkData();

  console.log(userData);
  console.log(status);

  //local links iteration
  //then render the dropdown options excluding the already selected platforms

  // 🧭 Load user data into local state
  useEffect(() => {
    console.log(userData);
    if (status === "success" && userData.links) {
      setLocalLinks(userData.links);
      dispatch(setUserLinkData(userData.links));
      dispatch(
        updateProfileDetails({
          email: userData.user.email || "",
          firstName: userData.user.firstName || "",
          lastName: userData.user.lastName || "",
          imgURL: userData.user.profileImage || "",
        })
      );
    }
  }, [status, userData, dispatch]);

  // 🧱 Handlers
  const handleAddLink = () => {
    const newLink = {
      linkId: generateRandomId(),
      details: {
        platform: "",
        linkInput: "",
        error: "",
      },
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

    console.log(selectedPlatform, link);
    // Find platform in platformDetails
    const platformData = platformDetails.find(
      (p) => p.platform.toLowerCase() === selectedPlatform?.toLowerCase()
    );

    console.log(platformData);

    // Validate link using the platform's regex
    if (!platformData.platFormat.test(link)) {
      // setError("Invalid URL.");
      return `Invalid ${platformData.platform} URL.`;
    }

    return ""; // ✅ No error — valid link
  };

  const moveLink = (sourceId, targetId) => {
    setLocalLinks((prev) => {
      const updated = [...prev];
      const sourceIndex = updated.findIndex((l) => l.linkId === sourceId);
      const targetIndex = updated.findIndex((l) => l.linkId === targetId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, JSON.parse(JSON.stringify(moved)));

      console.log("Updated after move:", updated);
      return updated;
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    const updated = localLinks.map((link) => {
      console.log(localLinks);
      const error = validateLink(link.details.platform, link.details.linkInput);
      return { ...link, details: { ...link.details, error } };
    });

    setLocalLinks(updated);

    const hasError = updated.some((link) => link.details.error);
    if (hasError) return; // ❌ stop saving
    console.log("Saving:", updated);

    dispatch(saveLinkBatch(updated));
    saveLinkDB({ id, linkdetails: updated });
    setIsDirty(false);
  };

  // 🧩 Render
  if (status === "pending") return <RealSpinner />;

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
          className="my-3 w-full hover:bg-LavenderMist border-NeonBlue p-2 border rounded-lg text-NeonBlue"
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
                linkData={link.details}
                linkId={link.linkId}
                onMove={moveLink}
                onDelete={() => handleDeleteLink(link.linkId)}
                onUpdate={handleUpdateLink}
                links={localLinks} // 👈 Pass all links for context
              />
            ))}
        </div>
      </div>

      <div className="p-5 flex justify-end">
        <SaveButton
          onClick={handleSave}
          disabled={saveLinkStatus === "pending" || !isDirty}
          notTooSmall={true}
          text={saveLinkStatus === "pending" ? "Saving..." : "Save"}
        />
      </div>
    </div>
  );
}

export default Page;
