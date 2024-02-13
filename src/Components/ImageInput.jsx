import { useEffect, useRef,  } from "react";
import { PiImage,  } from "react-icons/pi";
import { useUploadFile } from "../Database/useUploadFile";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
import { useFetchUrl } from "../Database/useFetchUrl";
import { useUpdateFile } from "../Database/useUpdateFile";

function ImageInput ({imgSrc,setImgSrc}){
  const fileInputRef=useRef(null)
  const {uploadImage}= useUploadFile()
  const {updateImage}=useUpdateFile()
  const {user} = getCurrentAccountAuth()
  const userEmail=user.email   
  const {imageURL,status}= useFetchUrl(userEmail)

  function handleImageChange(event){
    const file = event.target.files[0];
    if (file)
    {
      if(imageURL){
        updateImage({avatarFile:file,userEmail})
        setImgSrc(imageURL)
      }else{
        uploadImage({avatarFile:file,userEmail})
        setImgSrc(imageURL)
      }
    }
  }

  function handleClick(){
    fileInputRef.current.click()
  }

  useEffect(function(){
    setImgSrc(imageURL)
  },[imageURL,setImgSrc])

  return (
    <div className={`bg-LavenderMist ${imgSrc?"text-white":"text-NeonBlue"}  md:my-0 my-4 py-10 px-5 lg:py-14 rounded-lg flex flex-col justify-center items-center`}
    style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : "none", backgroundSize: "cover"}}>
    {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50 rounded-lg"></div> */}
      <PiImage className="w-7 h-7" />
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden"  accept="image/*" src="" alt="ProfileImage" />
      <label className="text-xs cursor-pointer" onClick={handleClick}>{imgSrc ? "Change image" : "+Upload image"}</label>
    </div>
  );
}

export default ImageInput;

