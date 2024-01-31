function SignInput ({icon,placeholder,type,label,name,onChange,value,errMessage,disabled}){

  return ( 
    <div className="my-4 focus:shadow-xl ">
     <label htmlFor={name}>
      <div className="flex justify-between">
      <span className="">{label}</span>
      <span className="text-right lg:w-1/4 md:hidden text-LightRed text-xs">{errMessage}</span>
        </div>   
            <div className="border rounded-lg hover:border-NeonBlue hover:shadow-MaximumBluePurple hover:shadow-md flex gap-3 p-2">
            <img src={icon}/>
            <input id={name} name={name}  onChange={onChange} disabled={disabled} type={type} value={value} className="w-full outline-none bg-inherit" placeholder={placeholder}/>
            <span className="hidden md:inline-block text-right lg:w-1/4 text-LightRed text-xs">{errMessage}</span>
            </div>
       </label>
    </div>
  );
}

export default SignInput;
