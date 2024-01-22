import Input from "./Input";
import Option from "./Option";

function AddLink (){
  return (
    <div draggable={true} className="bg-whiteFA rounded-lg p-3 my-3"> 
    <div className="flex justify-between">
      <span>Link #{}</span>
      <button>Remove</button>
    </div>

    <div>
      <label htmlFor="">
       <select id="">
         <Option value="github" src="icon-github.svg" platform="Github"/>
         </select>
      </label>
    </div>
   
    <Input type="text" placeholder="e.ghttps://www.github.com/Dotjos"/>
    </div>
  );
}

export default AddLink;
