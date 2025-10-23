import { useSelector } from "react-redux";
import PhoneLink from "../ui/PhoneLink";
import { platformDetails } from "../utilitis/LinkInfo";
import ShimmerLoading from "./ShimmerLoading";
import ProfileImageSkeleton from "./ProfileImageSkeleton";
import { useEffect, useRef, useState } from "react";

function Phoneview() {
  const addedLinks = useSelector((state) => state.LinkDetailsSlice.LinkDetails);
  const email = useSelector((state) => state.ProfileDetailsSlice.email);
  const imgSrc = useSelector((state) => state.ProfileDetailsSlice.imgURL);

  const [visibleCount, setVisibleCount] = useState(0);
  const [totalShimmers, setTotalShimmers] = useState(5);
  const containerRef = useRef(null);

  // 🟣 Measure how many shimmers fit into the visible container
  useEffect(() => {
    const measureShimmers = () => {
      if (!containerRef.current) return;
      const containerHeight = containerRef.current.clientHeight;
      console.log("Container height:", containerHeight);
      const shimmerHeight = 45; // ≈ height of one shimmer bar (px)
      const padding = 7; // adjust for margins/gaps
      const count = Math.floor(containerHeight / (shimmerHeight + padding));
      setTotalShimmers(count > 0 ? count : 3); // fallback to at least 3
    };

    measureShimmers();

    // Listen for resize events (responsive)
    window.addEventListener("resize", measureShimmers);
    return () => window.removeEventListener("resize", measureShimmers);
  }, []);

  const remainingShimmers = Math.max(totalShimmers - visibleCount, 0);

  useEffect(() => {
    setVisibleCount(addedLinks.length);
  }, [addedLinks]);

  return (
    <div className="hidden w-2/5 lg:flex items-center justify-center bg-white rounded-lg p-4">
      <div className="w-1/2 h-fit flex flex-col items-center relative">
        <img src="preview-section.svg" className="w-full" />
        <div className="items-center px-5 absolute top-10 w-11/12 h-5/6  bg-white overflow-y-auto flex flex-col">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt="Profile"
              className="w-20 h-20 border-2 border-NeonBlue rounded-full object-cover"
            />
          ) : (
            <>
              <ProfileImageSkeleton />{" "}
            </>
          )}
          {/* <ProfileImageSkeleton /> */}
          <h4 className="text-center text-Nickel pt-3 pb-8 text-xs">{email}</h4>

          <div className="w-full h-full" ref={containerRef}>
            {addedLinks.length > 0 && (
              <div className=" flex flex-col gap-3 w-full mb-5">
                {addedLinks?.map(({ linkId, details }) => {
                  const platformName = details?.platform;
                  const platformMeta =
                    platformDetails.find(
                      (item) => item.platform === platformName
                    ) || {};
                  return (
                    <PhoneLink
                      key={linkId}
                      link={details?.linkInput}
                      platform={platformName}
                      icon={platformMeta.img}
                      background={platformMeta?.color || "bg-LavenderMist"}
                    />
                  );
                })}
              </div>
            )}
            {/* rendering remaining shimmers if any */}
            {remainingShimmers > 0 && (
              <ShimmerLoading count={remainingShimmers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phoneview;
