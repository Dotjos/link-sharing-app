
function SignInput ({icon,placeholder,type,label,name}){
  return ( 
    <div className="my-4 focus:shadow-xl ">
     <label htmlFor={name}>
        <span className="">{label}</span>   
            <div className="border rounded-lg hover:border-NeonBlue hover:shadow-MaximumBluePurple hover:shadow-md flex gap-3 p-2">
            <img src={icon}/>
            <input id={name} type={type} className="w-full outline-none" placeholder={placeholder}/>
            </div>
       </label>
    </div>   
  );
}

export default SignInput;
