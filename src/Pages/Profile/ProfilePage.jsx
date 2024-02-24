import { useState } from "react";
import ImageInput from "../../Components/ImageInput";
import Input from "../../Components/Input";
import SaveButton from "../../Components/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import useSaveData from "../../Database/useSaveData";
import getCurrentAccountAuth from "../../Async/getCurrentAccountAuth";
import useFetchUserData from "../../Database/useFetchUserData";
import { useEffect } from "react";
import useSignOut from "../../Async/useSignOut";

function ProfilePage() {
  const profileDetails= useSelector(state=>state.ProfileDetailsSlice)
  const [dimensionError,setDimensionError]= useState(false)
  const {user}=   getCurrentAccountAuth()
  const dispatch=useDispatch()
  const id= user.id
  const {logOut,logOutStatus}= useSignOut()
  const {userData}=useFetchUserData(id,dispatch)
  const [firstName,setFirstName]= useState("")
  const [lastName,setLastName]= useState("")
  const [email,setEmail]= useState("")
  const {saveDB}= useSaveData()
  console.log(logOutStatus);
  

useEffect(function(){
  if(userData){
    setFirstName(userData.first_name),
    setLastName(userData.last_name),
    setEmail(userData.email)
  }
},[userData])

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
    saveDB({id,first_name:firstName,last_name:lastName,email})
  }
  
  return  (
    <div className="rounded-lg bg-white lg:w-7/12">
    <div className="w-full text-Nickel text-sm p-4  border-b">
    <h1 className="text-xl font-bold text-DarkCharcoal">Profile Details</h1>
    <p className="my-4">Add your details to create a personal touch to your profile.</p>
    <div className="bg-whiteFA p-4 mb-2 grid md:flex justify-between items-center rounded-lg">
      <h1 className="md:w-2/5 ">Profile picture</h1>
      <div className="w-3/4 md:w-1/4 ">
        <ImageInput dimensionError={dimensionError} setDimensionError={setDimensionError}/>
      </div>
      <p className= {`text-xs w-full md:w-1/5 ${dimensionError?"text-red-600":""}`} >Image must be below 1024x1024px. Use PNG or JPG format.</p>
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

      <div className="px-4 py-2.5 flex  justify-end">
        <SaveButton text="Sign out" notTooSmall={true} onClick={logOut} disabled={logOutStatus==="pending"}/>
      </div>

      </div>
    )
}

export default ProfilePage;
