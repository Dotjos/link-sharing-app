
function SaveButton ({active,text}){
  return (
        <button className={`w-full md:w-1/12 ${active?"bg-NeonBlue":"bg-MaximumBluePurple"}  rounded-md py-2 text-whiteFA`}>{text}</button> 
  );
}

export default SaveButton;
