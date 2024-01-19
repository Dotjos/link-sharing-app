
function SaveButton ({active}){
  return (
    <div className="flex md md:justify-end md:items-center w-full p-3">
        <button className={`w-full md:w-1/12 ${active?"bg-NeonBlue":"bg-MaximumBluePurple"}  rounded-md py-2 text-whiteFA`}>Save</button> 
    </div>
  );
}

export default SaveButton;
