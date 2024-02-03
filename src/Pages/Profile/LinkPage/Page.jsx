import SaveButton from "../../../Components/SaveButton";
import StartLnkPage from "../../../Components/StartLnkPage";
import AddLink from "../../../Components/AddLink";
import { generateRandomId } from "../../../utilis/generateId";
import { useDispatch, useSelector } from "react-redux";
import { createLinkObject, removeLink, saveLink } from "../../../Store/LinkDetailsSlice";

function Page() {
  const linkTemp = useSelector(state=>state.LinkDetailsSlice.LinkDetails)
  const dispatch=useDispatch()
  
  function handleSaveClick(){
     dispatch(saveLink())
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
        <div className="border-b w-full p-6 md:px-6 h-screen overflow-y-auto md:pt-10 md:pb-7">
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
         {linkTemp.length === 0&&<StartLnkPage/>}
         {linkTemp.length > 0 && linkTemp.map((link, index) => (
            <AddLink key={index}  linkNum={index} linkId={link.linkId}  onDelete={()=>handleDeleteLink(link.linkId)}/> 
         ))}
        </div>
         

        </div>
        <div className="p-5">
          <SaveButton onClick={handleSaveClick} active={linkTemp.length===0?false:true} small={true} text="Save"/>
        </div>
    </div>
  );
}

export default Page;
