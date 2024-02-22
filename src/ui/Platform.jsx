
function Platform ({platform,icon,handleSelected}){
  
  return (
    <div className="flex gap-x-5 cursor-pointer" onClick={handleSelected} >
      <img src={icon} alt={icon}/>
      <span >{platform}</span>
    </div>
  );
}

export default Platform;
