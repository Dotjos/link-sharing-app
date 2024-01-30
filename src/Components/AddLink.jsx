import SignInput from "../ui/SignInput";
import Platform from "../ui/Platform";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AddLinkDetails, addPersonaLink } from "../Store/LinkDetailsSlice";
import { platformDetails } from "../utilitis/LinkInfo";

function AddLink ({linkNum,onDelete,linkId}){
  const [click,setClick]=useState(false)
  const [linkInput,setLinkInput]=useState("")
  const [selected,setSelected]=useState({})
  const dispatch=useDispatch()

  function handleLinkInput(e){
    setLinkInput(e.target.value)
    const LinkObj={linkInput,linkId}
    dispatch(addPersonaLink(LinkObj))
  }

  function clickArrow(){
    setClick(prev=>!prev)
  }

  function handleSelection(platform){
    setSelected(platform)
    setClick(false)
    dispatch(AddLinkDetails({linkId:linkId,details:platform}))
  }

  return (
    <div draggable={true} className="bg-whiteFA transition-all duration-300 rounded-lg p-3 my-3"> 
    <div className="flex justify-between mb-3">
      <div className="flex gap-1">
      <img src="icon-drag-and-drop.svg"/>
      <span className="font-bold">Link #{linkNum+1}</span>
      </div>
      <button onClick={()=>onDelete(linkId)}>Remove</button>
    </div>

    <div>
      <div className="border p-2 gap-x-3 flex mb-3 bg-white rounded-lg">
        <img src={selected.img}/>
        <div className="flex justify-between items-center w-full">
          <span className="">{selected.platform?selected.platform:"Select platform here"}</span>
          <button onClick={clickArrow}>
          {click===true? <MdOutlineKeyboardArrowDown className="w-6 h-6"/>:<MdOutlineKeyboardArrowUp className="w-6 h-6"/> }
          </button>
        </div>
      </div>

      {click&&<ul className="bg-white list-image-none p-2  rounded-lg">
        {platformDetails.map((platf,index)=>
         <li  key={index} className="py-2 border-b">
        <Platform platform={platf.platform} icon={platf.img} handleSelected={()=>handleSelection(platf)}/>
        </li>
        )}
      </ul>}
    </div>
   
   <SignInput label="Link" disabled={!selected.platform} onChange={handleLinkInput} value={linkInput}  icon="icon-link.svg" placeholder="e.g.https://www.github.com/Dotjos"/>
    </div>
  );
}

export default AddLink;
