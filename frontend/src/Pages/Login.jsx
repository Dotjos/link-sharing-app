import { NavLink } from "react-router-dom";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";
import { useState } from "react";
import getSignedIn from "../Async/getSignedIn";

function Login (){
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState( {emailError:"",passwordError:""})
  const {signIn,status}=getSignedIn()

  function handleEmailInput(e){
    setEmail(e.target.value)  
    setError((prev)=>({...prev,emailError:""}))
   }

  function handlePasswordInput(e){
    setPassword(e.target.value) 
    setError((prev)=>({...prev,passwordError:""}))   
  }

function onSubmit(event){
  event.preventDefault()

  if (email.trim() === "") {
    setError((prevError) => ({ ...prevError, emailError: "Can't be empty" }));
  }else{
    setError((prevError) => ({ ...prevError, emailError: "" }));
  }

  if (password.trim() === "") {
    setError((prevError) => ({ ...prevError, passwordError: "Can't be empty" }));
  } else if (password.length < 8) {
    setError((prevError) => ({ ...prevError, passwordError: "Please check again" }));
  } else {
    setError((prevError) => ({ ...prevError, passwordError: "" }));
  }

  const formValid = email.trim() !== "" && password.trim() !== "" && !error.emailError && !error.passwordError;
if(formValid){
  signIn({email,password})
}
  
}
  return (
    <div>
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Login</h1>
      <p className="">Add your details below to get back into the app.</p>
      <form onSubmit={onSubmit} className="my-6">
          <SignInput label="Email address" autoComplete="email" error={error.emailError} errMessage={error.emailError} name="email" type="email" onChange={handleEmailInput} value={email} icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
          <SignInput label="Password" eyeAble={true} autoComplete="current-password" error={error.passwordError} errMessage={error.passwordError} name="password" type="password" onChange={handlePasswordInput} value={password} icon="icon-password.svg" placeholder="Enter your password"/>
          <SaveButton text="Login" loading={status==="pending"} disabled={status==="pending"} small={false}/>
      </form>
      <div className="grid md:flex text-center my-6 items-center justify-center">
        <span className="">Don&apos;t have an account?</span>
         <NavLink className="text-NeonBlue" to="/createAccount">Create Account</NavLink>
      </div>
    </div>
  );
}

export default Login;
