import { GoArrowRight } from "react-icons/go";

function PhoneLink({ platform, link, background, icon }) {
  function onClick() {
    link && window.open(link, "_blank");
  }

  return (
    <div
      className={`rounded-md ${background} cursor-pointer  justify-between flex items-center w-full h-9 my-3 text-whiteFA py-4 px-3`}
      onClick={onClick}
    >
      <div className="flex gap-x-3">
        <img src={icon} className="invert brightness-0" alt={icon} />
        <span className="text-xs">{platform}</span>
      </div>
      {link && <GoArrowRight className="w-4 h-4 text-white" />}
    </div>
  );
}

export default PhoneLink;
