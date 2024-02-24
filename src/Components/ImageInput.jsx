import { useEffect, useRef, useState,  } from "react";
import { PiImage,  } from "react-icons/pi";
import { useUploadFile } from "../Database/useUploadFile";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";
import { useFetchUrl } from "../Database/useFetchUrl";
import { useUpdateFile } from "../Database/useUpdateFile";
import BeadLoader from "./BeadLoader";

function ImageInput ({setDimensionError}){
  const fileInputRef=useRef(null)
  const {uploadImage,uploadStatus}= useUploadFile()
  const {user} = getCurrentAccountAuth()
  const userId= user.id  
  const {imageURL,invalidateUrlPathQuery}= useFetchUrl(userId)
  const {updateImage,updateStatus}= useUpdateFile()
  const [imgSrc,setImgSrc]=useState(null)
//   

  async function handleImageChange(event) {
    const file = event.target.files[0];
    const isImageDimensionValid=await isImageBelowMaxDimensions(file,1024,1024)
    invalidateUrlPathQuery()    
    if(isImageDimensionValid){
      setDimensionError(false)
      if(!imgSrc){
        uploadImage({ avatarFile: file, id: userId }); 
        setImgSrc(imageURL);     
      } else{
        updateImage({ avatarFile: file, id: userId})
        setImgSrc(imageURL);
      }
    }else{
      setDimensionError(true)
    }
    }

   
    async function isImageBelowMaxDimensions(file, maxWidth, maxHeight) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
          console.log({"width":img.width});
          console.log({'height':img.height});
        
          const isBelowMaxDimensions = img.width <= maxWidth && img.height <= maxHeight;
          resolve(isBelowMaxDimensions);
        };
        img.onerror = function() {
          reject(new Error('Failed to load image'));
        };
        const objectURL = URL.createObjectURL(file);
        img.src = objectURL;
      });
    }

  function handleClick(){
    fileInputRef.current.click()
  }

  useEffect(function(){
    invalidateUrlPathQuery()
      setImgSrc(imageURL);
  }, [imageURL, setImgSrc, imgSrc,uploadStatus,updateStatus,invalidateUrlPathQuery]);
  
    
    return (
      <div className="md:my-0 my-4 h h-36  overflow-hidden relative rounded-lg flex flex-col justify-center items-center">
          {imgSrc&&<div className="absolute inset-0 flex z-0 items-center justify-center" style={{ backgroundImage: imgSrc ?  `url(${imgSrc}?v=${new Date().getTime()})` : "none", backgroundSize: "cover"}}>
            </div>}
            {(uploadStatus==="pending"||updateStatus==="pending")&&<BeadLoader/>}
            <div>
              <div className="z-50 absolute left-0 top-0 h-full hover:backdrop-contrast-50 text-NeonBlue w-full ">
              <div className=" h-full flex flex-col  items-center justify-center">
                 <PiImage className="w-7 h-7" />
                 <input type="file" ref={fileInputRef} aria-label="image Input" onChange={handleImageChange} className="hidden"  accept="image/*" src="" alt="ProfileImage" />
                 <label className="cursor-pointer font-instrumentSansSemiBold  text-base" aria-label="image Input Label" onClick={handleClick}>{imgSrc ? "Change image" : "+Upload image"}</label>
              </div>
              </div>
            </div>
      </div>
    )



  // return (
  //   <div className={`bg-LavenderMist ${imgSrc?"text-white":"text-NeonBlue"}  md:my-0 my-4 py-10 px-5 lg:py-14 rounded-lg flex flex-col justify-center items-center`}
  //   style={{ backgroundImage: imgSrc ? `url(${imgSrc}?v=${Date.now()})` : "none", backgroundSize: "cover"}}>
  //   {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50 rounded-lg"></div> */}
  //     <PiImage className="w-7 h-7" />
  //     <input type="file" ref={fileInputRef} aria-label="image Input" onChange={handleImageChange} className="hidden"  accept="image/*" src="" alt="ProfileImage" />
  //     <label className="text-xs cursor-pointer" aria-label="image Input Label" onClick={handleClick}>{imgSrc ? "Change image" : "+Upload image"}</label>
  //   </div>
  // );
}

export default ImageInput;

