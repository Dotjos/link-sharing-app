import { useSelector } from "react-redux";
import PhoneLink from "../ui/PhoneLink";

function LinkOverview (){
  const profileDetails=useSelector(state=>state.ProfileDetailsSlice)
  const userLinks=useSelector(state=>state.LinkDetailsSlice.LinkDetails)
  const image=useSelector(state=>state.ProfileDetailsSlice.imgURL)
  const firstName=profileDetails.confirmFirstName
  const lastName=profileDetails.confirmLastName
  const firstInitial=firstName[0]
  const lastNameInitial=lastName[0]
  const linkReady=userLinks.filter(el=>el.details.link)
  
  return (
    <div className="w-full md:absolute pt-7 px-6 md:px-10 text-center md:top-24 lg:top-32">
       <div className="bg-white h-full w-full ml-auto mr-auto md:w-1/3 p-7 rounded-lg">
         <div className="border-2 border-NeonBlue rounded-full p-16 w-2/4 md:w-2/5 lg:w-1/3 ml-auto mr-auto"
         style={{ backgroundImage: image ? `url(${image})` : "none", backgroundSize: "cover"}}
         >
          <span>{!image&&firstInitial+lastNameInitial}</span>
          </div>
         <h1 className="text-DarkCharcoal text-3xl">{firstName} {lastName}</h1>
        <span className="t text-Nickel">{profileDetails.email}</span>
        <div>{linkReady.map((link,index)=><PhoneLink key={index} platform={link.details.platform} link={link.details.link} background={link.details.color} icon={link.details.img}/>)}</div>
    </div>
    </div>
    
  );
}

export default LinkOverview;
