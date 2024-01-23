import {  IoImageOutline } from "react-icons/io5";


import { useEffect, useState } from 'react';
const imageMimeType = /image\/(png|jpg|jpeg)/i;
function ImageInput (){
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }
  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  return <div>
    <form>
        <p>
          <input
            type="file"
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={changeHandler}
            className='cursor-pointer  border'
          />
        </p>
        
      </form>
      {fileDataURL ?
        <p className="img-preview-wrapper border w-full">
          {
            <img src={fileDataURL} alt="preview" className='' width="100" height="100" />
          }
        </p> : null}
  </div>
}


  export default ImageInput;