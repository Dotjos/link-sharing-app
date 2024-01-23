import SignInput from "../ui/SignInput";
import Option from "./Option";
import { LuLink } from "react-icons/lu";

function AddLink ({linkNum,onDelete,linkId}){
  return (
    <div draggable={true} className="bg-whiteFA transition-all duration-300 rounded-lg p-3 my-3"> 
    <div className="flex justify-between">
      <span>Link #{linkNum+1}</span>
      <button onClick={()=>onDelete(linkId)}>Remove</button>
    </div>

    <div>
      <label htmlFor="">
       <select id="">
         <Option value="github" src="icon-github.svg" platform="Github"/>
         </select>
      </label>
    </div>
   
   <SignInput label="Link" icon="icon-link.svg" placeholder="e.g.https://www.github.com/Dotjos"/>
    
    </div>
  );
}

export default AddLink;
