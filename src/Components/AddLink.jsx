import SignInput from "../ui/SignInput";
import Option from "./Option";
import { LuLink } from "react-icons/lu";
import Platforms from "./Platforms";

const platformDetails=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]


function AddLink ({linkNum,onDelete,linkId}){
  return (
    <div draggable={true} className="bg-whiteFA transition-all duration-300 rounded-lg p-3 my-3"> 
    <div className="flex justify-between">
      <div className="flex gap-1">
      <img src="icon-drag-and-drop.svg"/>
      <span className="font-bold">Link #{linkNum+1}</span>
      </div>
      <button onClick={()=>onDelete(linkId)}>Remove</button>
    </div>

    <div>
      <div className="border p-2 gap-x-3 flex mb-3 bg-white rounded-lg">
        <img src="icon-github.svg "/>
        <div className="flex justify-between w-full">
          <span>Github</span>
          <img src="icon-arrow-right.svg" alt="icon-arrow-right.svg"/>
        </div>
      </div>
     <Platforms/> 
    </div>

    
   
   <SignInput label="Link" icon="icon-link.svg" placeholder="e.g.https://www.github.com/Dotjos"/>
    
    </div>
  );
}

export default AddLink;
