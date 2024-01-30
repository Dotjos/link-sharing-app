import { useSelector } from "react-redux";
import PhoneLink from "../ui/PhoneLink"

function Phoneview (){
  const addedLinks = useSelector((state) => state.LinkDetailsSlice.LinkDetails);
  console.log(addedLinks);
  
  return ( 
       <div className="hidden w-2/5 lg:flex items-center justify-center bg-white rounded-lg p-4">
        <div className="w-full items-center flex justify-center relative">
        <img src="illustration-phone-mockup.svg" className="w-1/2"/>
        <div className="bg-white rounded-lg  bottom-4 w-5/12 h-2/3 overflow-y-auto absolute">
          {addedLinks.map(addeDetails=><PhoneLink key={addeDetails.linkId} platform={addeDetails.details?.platform}  background={addeDetails.details?.color || "bg-LavenderMist"}/>)}
         </div>
        </div>
      </div>
  );
}

export default Phoneview;
