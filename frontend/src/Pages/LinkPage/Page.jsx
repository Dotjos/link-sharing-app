import SaveButton from "../../Components/SaveButton";
import StartLnkPage from "../../Components/StartLnkPage";
import AddLink from "../../Components/AddLink";
import RealSpinner from "../../Components/RealSpinner";
import { generateRandomId } from "../../utilis/generateId";
import { useDispatch, useSelector } from "react-redux";
import { createLinkObject, removeLink, saveLink, setUserData } from "../../Store/LinkDetailsSlice";
import getCurrentAccountAuth from "../../Async/getCurrentAccountAuth";
import useSaveLinkData from "../../Database/useSaveLinkData";
import useFetchUserData from "../../Database/useFetchUserData";
import { useEffect } from "react";

function Page() {
  const linkTemp = useSelector(state=>state.LinkDetailsSlice.LinkDetails)
  const dispatch=useDispatch()
  const {saveLinkDB,saveLinkStatus}= useSaveLinkData()
  const {user}=getCurrentAccountAuth()
  console.log(user);
  const id=user?.id
  const {userData,status}=useFetchUserData(id)
  const linkdetails = userData?.linkdetails

  useEffect(() => {
    if (status === "success") {
    dispatch(saveLink())
     dispatch(setUserData(linkdetails))
    }
  }, [status,linkdetails,dispatch])
 
  function handleSaveClick(){    
    dispatch(saveLink())
    saveLinkDB({id,linkdetails:linkTemp})
   }

  function handleClick(){
  dispatch(createLinkObject(generateRandomId()))
  }

  const handleDeleteLink = (linkId) => {
  // Filter out the link with the specified linkId
   dispatch(removeLink(linkId))
  };

  return (
    <div className="lg:w-7/12 text-sm text-Nickel bg-white rounded-lg">
      {status==="success"&&<div className="border-b w-full p-6 md:px-6 h-screen overflow-y-auto md:pt-10 md:pb-7">
          <h1 className="font-bold text-xl text-DarkCharcoal">
            Customize your links
          </h1>
          <p className="text-sm mb-3">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button className="my-3 w-full border-NeonBlue p-2 border rounded-lg text-NeonBlue" onClick={handleClick} >
            + Add new link
          </button>

        <div >
         {linkTemp?.length === 0&&<StartLnkPage/>}
         {linkTemp?.length > 0 && linkTemp?.map((link, index) => (
            <AddLink key={index}  linkNum={index} linkId={link.linkId}  onDelete={()=>handleDeleteLink(link.linkId)}/> 
         ))}
        </div>
         
        </div>}
        
      {status==="pending"&&<RealSpinner/>}

        <div className="p-5">
          <SaveButton onClick={handleSaveClick} disabled={saveLinkStatus==="pending"}  small={true} text="Save"/>
        </div>
    </div>
  );
}

export default Page;
