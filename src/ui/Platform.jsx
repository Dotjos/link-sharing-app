
function Platform ({platform,icon,mb}){
  return (
    <div className={`flex gap-x-5 py-1.5 ${mb&&"border-b"}`}>
      <img src={icon} alt={icon}/>
      <span>{platform}</span>
    </div>
  );
}

export default Platform;
