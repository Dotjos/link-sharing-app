
function Input ({type,label,placeholder,id,asteriks}){
  return (
    <label className="md:flex md:w-full" htmlFor={id}>
        <span className="">{asteriks&&"*"}{label}</span>
    <input type={type} id={id} placeholder={placeholder} className="p-2.5 w-full md:w-3/4 mb-2 bg-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-offset-2 border-LavenderMist"/>
    </label>
  );
}

export default Input;
