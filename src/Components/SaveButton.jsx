function SaveButton ({active,text,small,onClick,disable}){
  return (
      <button onClick={onClick} disabled={disable} className={`w-full ${small?"md:w-1/12":""}  ${active?"bg-NeonBlue":"bg-MaximumBluePurple"}  rounded-md py-2 text-whiteFA`}>{text}</button> 
  );
}

export default SaveButton;
