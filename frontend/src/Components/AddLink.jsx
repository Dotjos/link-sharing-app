// export default AddLink;
import SignInput from "../ui/SignInput";
import Platform from "../ui/Platform";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import { platformDetails } from "../utilitis/LinkInfo";

function AddLink({ linkNum, linkId, linkData, onDelete, onMove, onUpdate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  // 🟠 Drag & Drop setup
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "template",
    item: { linkId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "template",
    hover: (draggedItem) => {
      if (draggedItem.linkId === linkId) return;
      console.log("hovering", draggedItem.linkId, "over", linkId);

      onMove(draggedItem.linkId, linkId);
    },
  }));

  // Current selected platform from data
  const selectedPlatform =
    linkData?.platform ||
    platformDetails.find((p) => p.platform === "GitHub") || // fallback
    platformDetails[0];

  // Current link input and error
  const linkInput = linkData?.linkInput || "";
  const error = linkData?.error || "";

  // 🧩 Platform selection
  function handlePlatformSelect(platform) {
    onUpdate(linkId, { ...linkData, platform, error: "" });
    setShowDropdown(false);
  }

  // 🧩 Link input change
  function handleLinkInput(e) {
    const inputValue = e.target.value;
    onUpdate(linkId, {
      ...linkData,
      platform: selectedPlatform,
      linkInput: inputValue,
      error: "",
    });
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-whiteFA rounded-lg p-3 my-3 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <img
            className="w-4 h-4 cursor-move"
            src="icon-drag-and-drop.svg"
            alt="drag"
          />
          <span className="font-bold">Link #{linkNum + 1}</span>
        </div>
        <button onClick={() => onDelete(linkId)}>Remove</button>
      </div>

      {/* Dropdown */}
      <div
        onClick={() => setShowDropdown((p) => !p)}
        className="border p-2 gap-x-3 flex hover:border-NeonBlue hover:shadow-xl mb-3 bg-white rounded-lg cursor-pointer"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-5 items-center">
            <img
              src={selectedPlatform?.img || ""}
              alt={`${selectedPlatform?.platform} icon`}
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
            <li
              key={index}
              className="py-2 border-b last:border-none hover:bg-LavenderMist cursor-pointer"
              onClick={() => handlePlatformSelect(platf)}
            >
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
