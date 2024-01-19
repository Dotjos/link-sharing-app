import Input from "./Input";

function AddLink (){
  return (
    <div className="bg-whiteFA rounded-lg p-3 my-3 "> 
    <div className="flex justify-between">
      <span>Link #1</span>
      <button>Remove</button>
    </div>

    <div>
      <label htmlFor="">
       <select id="">
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>3</option>
         <option>6</option>
         </select>
      </label>
    </div>
   
    <Input type="text" placeholder="e.ghttps://www.github.com/Dotjos"/>
    </div>
  );
}

export default AddLink;
