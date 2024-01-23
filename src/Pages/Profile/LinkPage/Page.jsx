import { useState } from "react";
import SaveButton from "../../../Components/SaveButton";
import StartLnkPage from "../../../Components/StartLnkPage";
import AddLink from "../../../Components/AddLink";
import { generateRandomId } from "../../../utilis/generateId";
function Page() {
  const [noClick,setNoClick]=useState(0)
  const [linkTemp,setLinkTemp]=useState([])
  const id=generateRandomId()

  function handleClick(){
  setNoClick(prev=>prev+1)
  setLinkTemp((prev)=>[...prev,{noClick,id}])
  console.log(linkTemp);  
}
  const handleDeleteLink = (linkId) => {
  // Filter out the link with the specified linkId
  const updatedLinks = linkTemp.filter((link) => link.id !== linkId);
  setLinkTemp(updatedLinks);
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
         {!noClick&&<StartLnkPage/>}
         {linkTemp.length > 0 && linkTemp.map((link, index) => (
         <AddLink key={index} linkNum={index} linkId={link.id} onDelete={handleDeleteLink}/>
         ))}
        </div>
        <div className="p-5">
          <SaveButton active={linkTemp.length===0?false:true} small={true} text="Save"/>
        </div>
    </div>
  );
}

export default Page;
