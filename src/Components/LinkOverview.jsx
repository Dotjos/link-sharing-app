import { useSelector } from "react-redux";
import PhoneLink from "../ui/PhoneLink";

function LinkOverview (){
  const profileDetails=useSelector(state=>state.ProfileDetailsSlice)
  const userLinks=useSelector(state=>state.LinkDetailsSlice.LinkDetails)
  console.log(userLinks);
  
  const linkReady=userLinks.filter(el=>el.details.link)
  console.log(linkReady);
  
  return (
    <div className="w-full md:absolute pt-7 px-6 md:px-10 text-center md:top-24 lg:top-32">
       <div className="bg-white h-full w-full ml-auto mr-auto md:w-1/3 p-7 rounded-lg ">
         <div className="border-4 border-NeonBlue rounded-full ">
            <img src=""/>
          </div>
         <h1 className="text-DarkCharcoal text-3xl">{profileDetails.confirmFirstName} {profileDetails.confirmLastName}</h1>
        <span className="t text-Nickel">{profileDetails.email}</span>
        <div>{linkReady.map((link,index)=><PhoneLink key={index} platform={link.details.platform} link={link.details.link} background={link.details.color} icon={link.details.img}/>)}</div>
    </div>
    </div>
    
  );
}

export default LinkOverview;
