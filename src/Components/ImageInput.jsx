import { useRef,  } from "react";
import { PiImage } from "react-icons/pi";

function ImageInput ({imgSrc,setImgSrc}){
  const fileInputRef=useRef(null)
  function handleImageChange(event){
    const file = event.target.files[0];
    if (file){
   const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
   setImgSrc(imageUrl)
    }
  }

  function handleClick(){
    fileInputRef.current.click()
    console.log(imgSrc);
    
  }

  return (
    <div className={`bg-LavenderMist ${imgSrc?"text-white":"text-NeonBlue"}  md:my-0 my-4 py-10 px-5 lg:py-14 rounded-lg flex flex-col justify-center items-center`}
    style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : "none", backgroundSize: "cover"}}>
    {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50 rounded-lg"></div> */}
      <PiImage className="w-7 h-7" />
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden"  accept="image/*" src="" alt="ProfileImage" />
      <button className="text-xs" onClick={handleClick}>{imgSrc? "Change image":"+Upload image"}</button>
    </div>
  );
}

export default ImageInput;

