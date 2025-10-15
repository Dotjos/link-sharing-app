import PhoneLink from "../ui/PhoneLink";
import { useParams } from "react-router-dom";
import useFetchUserData from "../Hooks/useFetchUserData";
import Spinner from "./Spinner";

function LinkOverview() {
  const { userId } = useParams();
  const { userData, status } = useFetchUserData(userId);
  const userLinkDetails = userData?.linkdetails;
  const firstName = userData?.first_name;
  const lastName = userData?.last_name;
  const email = userData?.email;

  console.log(userLinkDetails);

  const refinedUserLinkDetails = userLinkDetails?.filter((item) => {
    return (
      item.details &&
      typeof item.details === "object" &&
      Object.keys(item.details).length &&
      !item.details.error &&
      item.details.linkInput !== ""
    );
  });

  console.log(refinedUserLinkDetails);

  return (
    <div className="w-full md:absolute pt-7 px-6 md:px-10 text-center md:top-24 lg:top-32 ">
      {status === "pending" && <Spinner />}
      {status === "success" && (
        <div className="">
          <div className="bg-white h-full w-full ml-auto mr-auto md:w-1/3 p-7 rounded-lg">
            <div
              className="border-2 border-NeonBlue rounded-full p-16 w-2/4 md:w-2/5 lg:w-1/3 ml-auto mr-auto"
              style={{
                backgroundImage: imageURL ? `url(${imageURL})` : "none",
                backgroundSize: "cover",
              }}
            >
              {(!imageURL || urlStatus === "error") && (
                <span className="font-instrumentSansSemiBold">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-DarkCharcoal text-3xl">
              {firstName} {lastName}
            </h1>
            <span className="t text-Nickel">{email}</span>
            <div>
              {refinedUserLinkDetails?.map((link, index) => (
                <PhoneLink
                  key={index}
                  platform={link.details.platform}
                  link={link.details.link}
                  background={link.details.color}
                  icon={link.details.img}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="h-96 rounded-lg bg-white flex items-center justify-center">
          <h1 className="text-red-400 md:text-4xl font-bold font-instrumentSansBold mt-auto mb-auto">
            Kindly check your network or devlink link and try again
          </h1>
        </div>
      )}
    </div>
  );
}

export default LinkOverview;
