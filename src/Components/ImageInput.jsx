import { useEffect, useRef, useState,  } from "react";
import { PiImage,  } from "react-icons/pi";
import { useUploadFile } from "../Database/useUploadFile";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
import { useFetchUrl } from "../Database/useFetchUrl";
import { useUpdateFile } from "../Database/useUpdateFile";

function ImageInput (){
  const fileInputRef=useRef(null)
  const {error,setError}= useState("")
  const {uploadImage}= useUploadFile()
  const [timestamp, setTimestamp] = useState(Date.now());
  const {user} = getCurrentAccountAuth()
  const userId= user.id  
  const {imageURL,invalidateUrlPathQuery}= useFetchUrl(userId)
  const {updateImage}= useUpdateFile()
  const [imgSrc,setImgSrc]=useState(null)
//   

   function handleImageChange(event) {
    const file = event.target.files[0];
    setTimestamp(Date.now());
    
    if(!imgSrc){
      uploadImage({ avatarFile: file, id: userId });      
    } else{
      updateImage({ avatarFile: file, id: userId})
      invalidateUrlPathQuery()
    }

    setImgSrc(`${imageURL}?v=${timestamp}`);
    }


  function handleClick(){
    fileInputRef.current.click()
  }

  useEffect(function(){
    
      setImgSrc(imageURL);
  }, [imageURL, setImgSrc, imgSrc]);
  

  return (
    <div className={`bg-LavenderMist ${imgSrc?"text-white":"text-NeonBlue"}  md:my-0 my-4 py-10 px-5 lg:py-14 rounded-lg flex flex-col justify-center items-center`}
    style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : "none", backgroundSize: "cover"}}>
    {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50 rounded-lg"></div> */}
      <PiImage className="w-7 h-7" />
      <input type="file" ref={fileInputRef} aria-label="image Input" onChange={handleImageChange} className="hidden"  accept="image/*" src="" alt="ProfileImage" />
      <label className="text-xs cursor-pointer" aria-label="image Input Label" onClick={handleClick}>{imgSrc ? "Change image" : "+Upload image"}</label>
    </div>
  );
}

export default ImageInput;

