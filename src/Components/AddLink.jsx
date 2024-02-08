import SignInput from "../ui/SignInput";
import Platform from "../ui/Platform";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddLinkDetails, addPersonaLink, reOrganizeState } from "../Store/LinkDetailsSlice";
import { platformDetails } from "../utilitis/LinkInfo";
import { useDrag, useDrop } from "react-dnd";

function AddLink ({linkNum,onDelete,linkId}){
  const initialLinkInputFromRedux = useSelector((state) => {
  const linkDetail = state.LinkDetailsSlice.LinkDetails.find(
      (item) => item.linkId === linkId
    );
  return linkDetail?.details?.linkInput || '';
  });
  const [click,setClick]=useState(false)
  const [linkInput,setLinkInput]=useState(initialLinkInputFromRedux)
  const [selected,setSelected]=useState({})
  const dispatch=useDispatch()
  const reduxValue = useSelector((state) => state.LinkDetailsSlice.LinkDetails);
 
    const [{isDragging},drag] = useDrag(()=>({
       type:"template",
       collect:(monitor)=>({
          isDragging: !!monitor.isDragging()
       }),
       item:{linkId},
       end:(item,monitor)=>{
        handleDrop(item,monitor)
       
       }
    }))

    const [collectedProps, drop] = useDrop(() => ({
      accept: "template",
      drop: (item,monitor) => {
        return {linkId}
      },
    
    }));

  // function  handleAccessDrop(item,monitor){
  //   // console.log(item);
  //   // console.log(monitor);
  // }

 function handleDrop(item,monitor){
  const dropResult = monitor.getDropResult()
  dispatch(reOrganizeState({sourceId:item.linkId,targetId:dropResult.linkId}))
 }



// Use useEffect to update the local state if the Redux value changes
useEffect(() => {
  setLinkInput(initialLinkInputFromRedux || '');
}, [initialLinkInputFromRedux]);

  useEffect(() => {
    setSelected(reduxValue.find((value) => value.linkId === linkId));
  }, [reduxValue, linkId]);

  function handleLinkInput(e){
    const inputValue = e.target.value;
    setLinkInput(inputValue);
    dispatch(addPersonaLink({linkInput:inputValue,linkId}))
  }

  function clickArrow(){
    setClick(prev=>!prev)
  }

  function handleSelection(platform){
    setClick(false)
    dispatch(AddLinkDetails({linkId:linkId,details:{...platform,linkInput}}))
  }

  return (
    <div ref={drop} className="bg-whiteFA transition-all duration-300 rounded-lg p-3 my-3"> 
    <div className="flex justify-between mb-3">
      <div className="flex gap-3 items-center">
      <img ref={drag} className="w-4 h-4" src="icon-drag-and-drop.svg"/>
      <span className="font-bold">Link #{linkNum+1}</span>
      </div>
      <button onClick={()=>onDelete(linkId)}>Remove</button>
    </div>

    <div>
      <div onClick={clickArrow} className="border p-2 gap-x-3 flex mb-3 bg-white rounded-lg">
        <img src={selected.details?selected.details.img:""}/>
        <div className="flex justify-between items-center w-full">
          <span className="">{selected.details?selected.details.platform:"Select platform here"}</span>
          <button>
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

   <SignInput label="Link" error={selected.details?.error} disabled={!selected.details} errMessage={selected.details?.error} onChange={handleLinkInput} value={linkInput}   icon="icon-link.svg" placeholder="e.g.https://www.github.com/Dotjos"/>
    </div>
  );
}

export default AddLink;
