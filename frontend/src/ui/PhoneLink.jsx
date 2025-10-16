import { GoArrowRight } from "react-icons/go";

function PhoneLink({ platform, overview, link, background, icon }) {
  function onClick() {
    link && window.open(link, "_blank");
  }

  return (
    <div
      className={`rounded-md ${background} cursor-pointer  justify-between flex items-center w-full  ${
        overview ? "h-11" : "h-9"
      } text-whiteFA py-4 px-3`}
      onClick={onClick}
    >
      <div className="flex gap-x-3">
        <img src={icon} className="invert brightness-0" alt={icon} />
        <span className="text-sm">{platform}</span>
      </div>
      {link && <GoArrowRight className="w-4 h-4 text-white" />}
    </div>
  );
}

export default PhoneLink;
