import Input from "../../Components/Input";
import SaveButton from "../../Components/SaveButton";

function ProfilePage() {
  return <div className="bg-white w-full  rounded-lg p-4 lg:w-7/12">
    <h1>Profile Details</h1>
    <p>Add your details to create a personal touch to your profile.</p>
    <div className="bg-whiteFA p-2 mb-2 grid md:flex">
      <h1>Profile picture</h1>
      <input type="image"/>
      <span>Image must be below 1024x1024px. Use PNG or JPG format.</span>
    </div>
    <form className="bg-whiteFA grid p-3 w-full justify-between rounded-lg">
      <Input type="text" label="Firstname" asteriks={true} id="Firstname" placeholder="e.g.John"/>
      <Input type="text" label="Lastname" asteriks={true} id="Lastname" placeholder="e.g.Appleseed"/>
      <Input type="mail" label="Email" asteriks={true} id="Email" placeholder="e.g.email@example.com"/>
    </form>
      <SaveButton/>
  </div>;
}

export default ProfilePage;
