import ImageInput from "../../Components/ImageInput";
import Input from "../../Components/Input";
import SaveButton from "../../Components/SaveButton";
import {  IoImageOutline } from "react-icons/io5";

function ProfilePage() {
  
  return <div className="bg-white w-full text-Nickel  text-sm rounded-lg p-4 lg:w-7/12">
    <h1 className="text-xl font-bold text-DarkCharcoal">Profile Details</h1>
    <p className="my-4">Add your details to create a personal touch to your profile.</p>
    <div className="bg-whiteFA p-4 mb-2 grid md:flex justify-between rounded-lg">
      <h1>Profile picture</h1>
      <ImageInput/>
      <p className="text-xs w-full">Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </div>
    <form className="bg-whiteFA grid p-3 w-full rounded-lg">
      <Input type="text" label="Firstname" asteriks={true} id="Firstname" placeholder="e.g.John"/>
      <Input type="text" label="Lastname" asteriks={true} id="Lastname" placeholder="e.g.Appleseed"/>
      <Input type="mail" label="Email" asteriks={false} id="Email" placeholder="e.g.email@example.com"/>
    </form>
      <SaveButton text="Save" active={true}/>
  </div>;
}

export default ProfilePage;
