import PhoneLink from "../ui/PhoneLink";
import { useParams } from "react-router-dom";
import useFetchUserData from "../Hooks/useFetchUserData";
import Spinner from "./Spinner";
import { platformDetails } from "../utilitis/LinkInfo";

function LinkOverview() {
  const { userId } = useParams();
  const { userData, status } = useFetchUserData(userId);
  const userLinkDetails = userData?.links;
  const firstName = userData?.user.firstName;
  const lastName = userData?.user.lastName;
  const email = userData?.user.email;
  const imageURL = userData?.user.profileImage;

  console.log(userData);
  console.log(userLinkDetails);
  console.log(imageURL);

  return (
    <div className="w-full md:absolute pt-5 px-6 md:px-10 text-center md:top-24 lg:top-32 ">
      {status === "pending" && <Spinner />}

      {status === "success" && (
        <div className="">
          <div className="bg-white h-full flex flex-col w-full ml-auto mr-auto md:w-1/3 p-7 rounded-lg">
            <div
              className="border-2 border-NeonBlue rounded-full mb-6 w-20 h-20 md:w-2/5 lg:w-1/3 ml-auto mr-auto"
              style={{
                backgroundImage: imageURL ? `url(${imageURL})` : "none",
                backgroundSize: "cover",
              }}
            >
              {!imageURL && (
                <span className="font-instrumentSansSemiBold">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-DarkCharcoal text-xl ff font-extrabold">
              {firstName} {lastName}
            </h1>
            <span className="text-xs mt-3 mb-8 text-Nickel">{email}</span>
            <div className="mt-3">
              {userLinkDetails?.map((link, index) => {
                const details = link?.details;
                if (
                  !details ||
                  typeof details !== "object" ||
                  !details.platform ||
                  !details.linkInput
                ) {
                  return null; // skip invalid entries safely
                }

                // Get metadata for the platform
                const platformMeta = platformDetails.find(
                  (item) => item.platform === details.platform
                );
                return (
                  <PhoneLink
                    key={index}
                    platform={link.details.platform}
                    link={link.details.link}
                    background={platformMeta?.color}
                    icon={platformMeta?.img}
                  />
                );
              })}
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
