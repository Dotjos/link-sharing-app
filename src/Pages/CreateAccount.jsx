import { NavLink } from "react-router-dom";
import Input from "../Components/Input";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";

function CreateAccount (){
  return (
    <div>
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Create Account</h1>
      <p>Let&apos;s get you started sharing your links</p>
      <form>
      <SignInput label="Email address" type="email" icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
      <SignInput label="Create password" type="password" icon="icon-password.svg" placeholder="At least 8 characters"/>
      <SignInput label="Confirm password" type="password" icon="icon-password.svg" placeholder="At least 8 characters"/>
      <span>Password must contain at least 8 characters</span>
      <SaveButton active={true} text="Create new Account"/>
      </form>
      
      <div className="grid md:flex text-center my-6"> 
        <span>Already have an account?</span>
        <NavLink className="text-NeonBlue" to="/">Login</NavLink>
      </div>
    </div>
  );
}

export default CreateAccount;
