
function SignInput ({icon,placeholder,type,label,id}){
  return ( 
    <div className="my-4">
     <label htmlFor={id}>
        <span className="">{label}</span>   
            <div className="border rounded-lg flex gap-3 p-2">
            <img src={icon}/>
            <input id={id} type={type} className="w-full outline-none" placeholder={placeholder}/>
            </div>
       </label>
    </div>   
  );
}

export default SignInput;
