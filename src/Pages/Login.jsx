import { NavLink } from "react-router-dom";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";


function Login (){
  return (
    <div>
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Login</h1>
      <p className="">Add your deatils below to get back into the app.</p>
      <form>
          <SignInput label="Email address" type="email" icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
          <SignInput label="Password" type="password" icon="icon-password.svg" placeholder="Enter your password"/>
          <SaveButton text="Login" active="false"/>
      </form>
      
      <div className="grid md:flex text-center my-6">
        <span>Don&apos;t have an account?</span>
         <NavLink className="text-NeonBlue" to="/createAccount">Create Account</NavLink>
      </div>
    </div>
  );
}

export default Login;
