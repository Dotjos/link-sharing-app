
function Input ({type,label,placeholder,id,asteriks,required}){
  return (
    <div className="md:flex justify-between items-center mb-3">
     <label className="" htmlFor={id}>{label}{asteriks&&"*"}</label> 
      <input required={required} type={type} id={id} placeholder={placeholder} className="flex my-1 md:my-0 p-2.5 w-full  md:w-2/4 mb-2 focus:outline-none focus:border-NeonBlue focus:shadow-MaximumBluePurple focus:shadow bg-white rounded-lg border border-LavenderMist"/>
    </div>   
  );
}

export default Input;
