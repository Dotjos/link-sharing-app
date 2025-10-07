import SignInput from "../ui/SignInput";
import Platform from "../ui/Platform";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { reOrganizeState } from "../Store/LinkDetailsSlice";
import { platformDetails } from "../utilitis/LinkInfo";
import { useDrag, useDrop } from "react-dnd";

function AddLink({ linkNum, linkId, linkData, onDelete, onUpdate }) {
  const dispatch = useDispatch();

  // 🟦 Local state (isolated from Redux)
  const [linkInput, setLinkInput] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(platformDetails[0]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (linkData?.details) {
      // find the full platform object based on the stored platform name
      const platformObj =
        platformDetails.find(
          (p) =>
            p.platform.toLowerCase() ===
            linkData.details.platform?.platform.toLowerCase()
        ) || platformDetails[0];

      setSelectedPlatform(platformObj);
      setLinkInput(linkData.details.linkInput || "");
      setError(linkData.details.error || "");
    }
  }, [linkData]);

  // 🟠 Drag & Drop setup
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "template",
    item: { linkId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [_, drop] = useDrop(() => ({
    accept: "template",
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        dispatch(
          reOrganizeState({
            sourceId: item.linkId,
            targetId: dropResult.linkId,
          })
        );
      }
    },
  }));

  function handlePlatformSelect(platform) {
    setSelectedPlatform(platform);
    setShowDropdown(false);
    onUpdate(linkId, { platform: platform, linkInput, error: "" });
  }

  function handleLinkInput(e) {
    const inputValue = e.target.value;
    setLinkInput(inputValue);
    onUpdate(linkId, {
      platform: selectedPlatform,
      linkInput: inputValue,
      error: "",
    });
  }

  return (
    <div
      ref={drop}
      className="bg-whiteFA rounded-lg p-3 my-3 transition-all duration-300"
    >
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <img
            ref={drag}
            className="w-4 h-4 cursor-move"
            src="icon-drag-and-drop.svg"
          />
          <span className="font-bold">Link #{linkNum + 1}</span>
        </div>
        <button onClick={() => onDelete(linkId)}>Remove</button>
      </div>

      {/* Dropdown */}
      <div
        onClick={() => setShowDropdown((p) => !p)}
        className="border p-2 gap-x-3 flex mb-3 bg-white rounded-lg"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-5 cursor-pointer">
            <img
              src={selectedPlatform?.img || ""}
              alt={`${selectedPlatform?.platform}icon`}
            />
            <span>{selectedPlatform?.platform}</span>
          </div>
          {showDropdown ? (
            <MdOutlineKeyboardArrowUp className="w-6 text-2xl text-NeonBlue h-6" />
          ) : (
            <MdOutlineKeyboardArrowDown className="w-6 text-NeonBlue text-2xl font-bold h-6" />
          )}
        </div>
      </div>

      {/* Platform list */}
      {showDropdown && (
        <ul className="bg-white p-2 rounded-lg shadow">
          {platformDetails.map((platf, index) => (
            <li key={index} className="py-2 border-b last:border-none">
              <Platform
                platform={platf.platform}
                icon={platf.img}
                handleSelected={() => handlePlatformSelect(platf)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Link Input */}
      <SignInput
        label="Link"
        error={error}
        disabled={!selectedPlatform}
        errMessage={error}
        onChange={handleLinkInput}
        value={linkInput}
        icon="icon-link.svg"
        placeholder={selectedPlatform?.placeholder}
      />
    </div>
  );
}

export default AddLink;
