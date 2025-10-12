import { useState } from "react";
import ImageInput from "../../Components/ImageInput";
import Input from "../../Components/Input";
import SaveButton from "../../Components/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import useSaveData from "../../Database/useSaveData";
import getCurrentAccountAuth from "../../Async/getCurrentAccountAuth";
import useFetchUserData from "../../Database/useFetchUserData";
import { useEffect } from "react";
import { updateProfileDetails } from "../../Store/ProfileDetailsSlice";

function ProfilePage() {
  const profileDetails = useSelector((state) => state.ProfileDetailsSlice);
  console.log(profileDetails);
  const {
    firstName: reduxFirstName,
    lastName: reduxLastName,
    email: reduxEmail,
  } = profileDetails;
  const [dimensionError, setDimensionError] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const { user } = getCurrentAccountAuth();
  const id = user?.id;
  const dispatch = useDispatch();
  const { userData } = useFetchUserData(id, dispatch);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });
  const { saveDB } = useSaveData();

  useEffect(
    function () {
      if (userData) {
        console.log(userData);
        dispatch(updateProfileDetails({ email: userData.user.email || "" }));
        setEmail(reduxEmail || "");
      }
    },
    [userData]
  );

  useEffect(() => {
    if (reduxFirstName || reduxLastName) {
      setFirstName(reduxFirstName);
      setLastName(reduxLastName);
      setImgSrc(profileDetails.imgURL);
    }
  }, [reduxFirstName, reduxLastName, profileDetails.imgURL]);

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function validateProfile({ firstName, lastName, email }) {
    const errors = {};

    if (!firstName.trim()) errors.firstName = "Can't be blank.";
    if (!lastName.trim()) errors.lastName = "Can't be blank.";

    return errors;
  }

  function handleSave() {
    const validationErrors = validateProfile({ firstName, lastName });
    console.log(firstName, lastName);

    // ✅ If there are any validation errors, don't proceed
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateProfileDetails({ firstName, lastName, imgURL: imgSrc }));
    console.log(profileDetails);
    setErrors({ firstName: "", lastName: "" });
    console.log(firstName, lastName);
    saveDB({ first_name: firstName, last_name: lastName });
  }

  return (
    <div className="rounded-lg bg-white lg:w-7/12">
      <div className="w-full text-Nickel text-sm p-4  border-b">
        <h1 className="text-xl font-bold text-DarkCharcoal">Profile Details</h1>
        <p className="my-4">
          Add your details to create a personal touch to your profile.
        </p>
        <div className="bg-whiteFA p-4 mb-2 grid md:flex justify-between items-center rounded-lg">
          <h1 className="md:w-2/5 ">Profile picture</h1>
          <div className="w-3/4 md:w-1/4 ">
            <ImageInput
              dimensionError={dimensionError}
              setDimensionError={setDimensionError}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
            />
          </div>
          <p
            className={`text-xs w-full md:w-1/5 ${
              dimensionError ? "text-red-600" : ""
            }`}
          >
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>

        <form className="bg-whiteFA grid p-3 w-full rounded-lg mb-5 ">
          <Input
            required={true}
            errText={errors.firstName}
            type="text"
            label="Firstname"
            value={firstName}
            onChange={handleFirstNameChange}
            asteriks={true}
            id="Firstname"
            placeholder="e.g.John"
          />
          <Input
            required={true}
            errText={errors.lastName}
            type="text"
            label="Lastname"
            value={lastName}
            onChange={handleLastNameChange}
            asteriks={true}
            id="Lastname"
            placeholder="e.g.Appleseed"
          />
          <Input
            required={false}
            type="email"
            label="Email"
            value={email}
            onChange={() => {}}
            // asteriks={true}
            // errText={errors.email}
            id="Email"
            placeholder="e.g.email@example.com"
          />
        </form>
      </div>

      <div className="px-4 flex justify-end py-2.5">
        <SaveButton
          text="Save"
          onClick={handleSave}
          notTooSmall={true}
          active={true}
        />
      </div>

      {/* <div className="px-4 py-2.5 flex  justify-end">
        <SaveButton
          text="Sign out"
          notTooSmall={true}
          onClick={logOut}
          disabled={logOutStatus === "pending"}
        />
      </div> */}
    </div>
  );
}

export default ProfilePage;
