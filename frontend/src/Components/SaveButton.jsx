function SaveButton ({active,text,small,disabled,onClick,notTooSmall}){
  return (
      <button onClick={onClick} disabled={disabled} className={`w-full ${small?"md:w-1/12":""} ${disabled?"bg-MaximumBluePurple":"bg-NeonBlue"}  ${notTooSmall&&"md:w-2/12"}  rounded-md py-1.5 px-1.5 text-whiteFA`}>{text}</button> 
  );
}

export default SaveButton;
