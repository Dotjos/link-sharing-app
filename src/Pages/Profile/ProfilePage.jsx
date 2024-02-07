import { useState } from "react";
import ImageInput from "../../Components/ImageInput";
import Input from "../../Components/Input";
import SaveButton from "../../Components/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileDetails } from "../../Store/ProfileDetailsSlice";

function ProfilePage() {
  const profileDetails= useSelector(state=>state.ProfileDetailsSlice)
 const [firstName,setFirstName] = useState(profileDetails.firstName)
 const [lastName,setLastName] = useState(profileDetails.lastName)
 const [email,setEmail] = useState(profileDetails.email)
 const dispatch=useDispatch()
console.log(profileDetails);

  function handleFirstNameChange(e){
    setFirstName(e.target.value)
  }
  function handleLastNameChange(e){
    setLastName(e.target.value)
  }
  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handleSave(){
    console.log("saved");
    dispatch(UpdateProfileDetails({firstName,lastName,email}))
    console.log(profileDetails);
    
  }
  
  return  (
    <div className="rounded-lg bg-white lg:w-7/12">

    <div className="w-full text-Nickel text-sm p-4  border-b">
   
    <h1 className="text-xl font-bold text-DarkCharcoal">Profile Details</h1>
    <p className="my-4">Add your details to create a personal touch to your profile.</p>
    <div className="bg-whiteFA p-4 mb-2 grid md:flex justify-between rounded-lg">
      <h1>Profile picture</h1>
      <ImageInput/>
      <p className="text-xs w-full">Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </div>

    <form className="bg-whiteFA grid p-3 w-full rounded-lg mb-5 ">
      <Input required={true} errText={profileDetails.errFirstName} type="text" label="Firstname" value={firstName} onChange={handleFirstNameChange} asteriks={true} id="Firstname" placeholder="e.g.John"/>
      <Input required={true} errText={profileDetails.errLastName}  type="text" label="Lastname" value={lastName} onChange={handleLastNameChange} asteriks={true} id="Lastname" placeholder="e.g.Appleseed"/>
      <Input required={false}  type="email" label="Email" value={email} onChange={handleEmailChange} asteriks={false} id="Email" placeholder="e.g.email@example.com"/>
    </form>
    
      </div>

      <div className="px-4 py-2.5" >
         <SaveButton text="Save" onClick={handleSave} small={true} active={true}/>
      </div>

      </div>
    )
}

export default ProfilePage;
