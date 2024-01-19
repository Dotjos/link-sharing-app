import { useState } from "react";
import SaveButton from "../../../Components/SaveButton";
import StartLnkPage from "../../../Components/StartLnkPage";
import AddLink from "../../../Components/AddLink";

function Page() {
  const [links, setLinks] = useState([]);
  const [click,setClick]=useState(false)
  const [noClick,setNoClicks]=useState(0)
  function handleClick(){
  setClick(true)
  setNoClicks((prev)=>prev+1)
  setLinks([...links, <AddLink key={noClick} />]);
}
  
  return (
    <div className="lg:w-7/12 text-sm text-Nickel bg-white rounded-lg">
        <div className="border-b w-full p-6 md:px-6 md:pt-10 md:pb-7">
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
         {!click&&<StartLnkPage/>}
         {links}
        </div>
          <SaveButton active={click}/>
    </div>
  );
}

export default Page;
