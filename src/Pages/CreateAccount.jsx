import { NavLink } from "react-router-dom";
import Input from "../Components/Input";
import SaveButton from "../Components/SaveButton";

function CreateAccount (){
  return (
    <div>
      <h1>Create Account</h1>
      <p>Let&apos;s get you started sharing your links</p>
      <form>
      <Input type="email"/>
      <Input type="password"/>
      <Input type="password"/>
      <span>Password must contain at least 8 characters</span>
      <SaveButton active={true} text="Create new Account"/>
      </form>
      
      <div>
        <span>Already have an account?</span>
        <NavLink to="/">Login</NavLink>
      </div>
    </div>
  );
}

export default CreateAccount;
