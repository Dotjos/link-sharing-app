function SaveButton ({active,text,small,disabled,onClick}){
  return (
      <button onClick={onClick} disabled={disabled} className={`w-full ${small?"md:w-1/12":""} ${disabled?"bg-MaximumBluePurple":"bg-NeonBlue"}  rounded-md py-1.5 text-whiteFA`}>{text}</button> 
  );
}

export default SaveButton;
