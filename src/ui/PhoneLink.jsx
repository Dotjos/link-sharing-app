
function PhoneLink ({platform,link,background}){
  return (
    <div className={`rounded-lg bg-${background} border flex items-center w-full h-7 my-3 py-4 px-3`}>
    <span>{platform}</span>
    </div>
  );
}

export default PhoneLink;


  