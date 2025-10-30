import { useEffect, useRef, useState } from "react";
import { PiImage } from "react-icons/pi";
import BeadLoader from "./BeadLoader";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
import useFetchUserData from "../Hooks/useFetchUserData";
import { useUploadFile } from "../Hooks/useUploadFile";
import {
  ProfileDetailsSlice,
  updateProfileDetails,
} from "../Store/ProfileDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

function ImageInput({ setDimensionError, imgSrc, setImgSrc, setDirty }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { user } = getCurrentAccountAuth();
  const userId = user?.id;
  const dispatch = useDispatch();
  // ✅ Fetch current image on component mount
  const { userData } = useFetchUserData(userId);
  const { uploadImage, uploadStatus } = useUploadFile();

  const profileDetails = useSelector((state) => state.ProfileDetailsSlice);
  console.log(profileDetails);

  useEffect(() => {
    if (userData?.user?.profileImage) {
      setImgSrc(userData.user.profileImage);
    }
  }, [userData]);

  // ✅ Upload image handler
  async function handleImageChange(event) {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    // ✅ Show instant preview
    const previewURL = URL.createObjectURL(file);
    setImgSrc(previewURL);
    console.log(previewURL);

    // ✅ Validate dimensions
    const isValid = await isImageBelowMaxDimensions(file, 1024, 1024);
    if (!isValid) {
      setDimensionError(true);
      return;
    }
    console.log(isValid);
    setDimensionError(false);
    setLoading(true);

    try {
      // ✅ Upload in background
      const res = await uploadImage(file);
      console.log("upload response:", res);
      console.log("res:", res);
      console.log("res?.imageUrl:", res?.imageUrl);
      console.log("typeof res?.imageUrl:", typeof res?.imageUrl);

      const newImageUrl = res?.imageUrl;

      if (newImageUrl) {
        // ✅ Replace preview with actual uploaded Cloudinary URL
        console.log("new Image trig");
        setImgSrc(newImageUrl);
        console.log("dispatch triggered");
        dispatch(updateProfileDetails({ imgURL: newImageUrl }));
        console.log("setDirty triggered");
        setDirty(true);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Check image dimension
  async function isImageBelowMaxDimensions(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const isBelow = img.width <= maxWidth && img.height <= maxHeight;
        resolve(isBelow);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  }

  function handleClick() {
    fileInputRef.current.click();
  }

  return (
    <div className="md:my-0 my-4 h-36 overflow-hidden relative rounded-lg flex flex-col justify-center items-center">
      {/* Profile Image Preview */}
      {imgSrc && (
        <div
          className="absolute inset-0 flex z-0 items-center justify-center"
          style={{
            backgroundImage: `url(${imgSrc}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      {/* Loading Spinner */}
      {loading && <BeadLoader />}

      {/* Upload overlay */}
      <div className="z-50 absolute left-0 top-0 h-full hover:backdrop-contrast-50 text-NeonBlue w-full flex flex-col items-center justify-center">
        <PiImage className="w-7 h-7" />
        <input
          type="file"
          ref={fileInputRef}
          aria-label="Profile image input"
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <label
          className="cursor-pointer font-instrumentSansSemiBold text-base"
          onClick={handleClick}
        >
          {imgSrc ? "Change image" : "+ Upload image"}
        </label>
      </div>
    </div>
  );
}

export default ImageInput;
