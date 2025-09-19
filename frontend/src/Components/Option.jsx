
function Option ({platform,value}){
  return (
    <option value={value} className="flex w-full gap-4">
          {platform}
    </option>
    
  );
}

export default Option;
