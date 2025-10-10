import { useSelector } from "react-redux";
import PhoneLink from "../ui/PhoneLink";
import { platformDetails } from "../utilitis/LinkInfo";

function Phoneview() {
  const addedLinks = useSelector((state) => state.LinkDetailsSlice.LinkDetails);

  return (
    <div className="hidden w-2/5 lg:flex items-center justify-center bg-white rounded-lg p-4">
      <div className="w-full items-center flex justify-center relative">
        <img src="illustration-phone-mockup.svg" className="w-1/2" />
        <div className="bg-white rounded-lg  bottom-4 w-5/12 h-2/3 overflow-y-auto absolute">
          {addedLinks?.map(({ linkId, details }) => {
            const platformName = details?.platform;
            const platformMeta =
              platformDetails.find((item) => item.platform === platformName) ||
              {};
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
      </div>
    </div>
  );
}

export default Phoneview;
