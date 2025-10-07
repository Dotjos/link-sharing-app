import { useState } from "react";
import { MdOutlineRemoveRedEye  } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
<IoEyeOffOutline />

function SignInput({ icon, placeholder, type, label, name, error, onChange, value, errMessage, disabled, eyeAble,autoComplete="off" }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = eyeAble && isPasswordVisible ? "text" : type;

  return (
    <div className="my-4 focus:shadow-xl">
      <label htmlFor={name}>
        <div className="flex justify-between">
          <span className="">{label}</span>
          {error && <span className="text-right lg:w-1/4  text-LightRed text-xs">{errMessage}</span>}
        </div>
        <div className={`border ${error ? 'border-LightRed' : ''} rounded-lg hover:border-NeonBlue hover:shadow-MaximumBluePurple hover:shadow-md flex gap-3 p-2`}>
          <img src={icon} />
          <input
            id={name}
            name={name}
            aria-invalid={!!error}
            autoComplete={autoComplete}
            onChange={onChange}
            disabled={disabled}
            type={inputType} // Update type based on isPasswordVisible
            value={value}
            className="w-full outline-none text-base bg-inherit"
            placeholder={placeholder}
          />
          {eyeAble && (
            <div className="cursor-pointer" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <IoEyeOffOutline className="w-7 h-7 p-0.5" /> : <MdOutlineRemoveRedEye className="w-7 h-7 p-0.5" />}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}


export default SignInput;
