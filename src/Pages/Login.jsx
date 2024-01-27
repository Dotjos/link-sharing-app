import { NavLink } from "react-router-dom";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";
import { useState } from "react";
import getSignedIn from "../Async/getSignedIn";


function Login (){
  const [credInput,setCredInput]=useState({email:"",password:""})
  // const {signInWithEmail,status}=getSignedIn()
  function handleInput(event){
  setCredInput((prev) => {
    return {
      ...prev,
      [event.target.name]: event.target.value,
    };
  });
  console.log(credInput);
   }

function onSubmit(event){
  event.preventDefault()
  // signInWithEmail(credInput.email,credInput.password)
  console.log(credInput.email,credInput.password);
  
}
  return (
    <div>
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Login</h1>
      <p className="">Add your deatils below to get back into the app.</p>
      <form>
          <SignInput label="Email address" name="email" type="email" onChange={handleInput} value={credInput.name} icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
          <SignInput label="Password" name="password" type="password" onChange={handleInput} value={credInput.password} icon="icon-password.svg" placeholder="Enter your password"/>
          <SaveButton onClick={onSubmit} text="Login"  active="false" small={false}/>
      </form>
      
      <div className="grid md:flex text-center my-6 items-center justify-center">
        <span className="">Don&apos;t have an account?</span>
         <NavLink className="text-NeonBlue" to="/createAccount">Create Account</NavLink>
      </div>
    </div>
  );
}

export default Login;
