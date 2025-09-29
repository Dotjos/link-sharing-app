import { NavLink } from "react-router-dom";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";
import { useState } from "react";
import { getCreateAccount } from "../Async/getCreateAccount";
import RealSpinner from "../Components/RealSpinner";

function CreateAccount (){
  const [email,setEmail]=useState("")
  const [password1,setPassword1]=useState("")
  const [password2,setPassword2]=useState("")
  const [emailErrorMessage,setEmailErrorMessage]= useState("")
  const [emailError, setEmailError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const {SignNew,status} =  getCreateAccount()
  const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError(false)
  }

  const handlePassword1 = (e) => {
    setPassword1(e.target.value)
    setPasswordLengthError(false)
    setPasswordMatchError(false)
  }

  const handlePassword2 = (e) => setPassword2(e.target.value);

const onSubmit = (e) => {
  e.preventDefault();

  // Check if the email is valid
  if (email.trim() === "") {
    setEmailError(true);
    setEmailErrorMessage("Can't be empty")
  } else if (!emailPattern.test(email)) {
    console.log(emailPattern.test(email));
    setEmailError(true)
    setEmailErrorMessage("Check your email format");
  }

  if (password1.length < 8) {
    setPasswordLengthError(true);
  } else if (password1 !== password2) {
    setPasswordMatchError(true);
  }

  // If the form is valid, perform the account creation logic
  SignNew({ email, password: password1 });
};

  return (
    <div className="">
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Create Account</h1>
      <p>Let&apos;s get you started sharing your links</p>
      <form>
      <SignInput label="Email address" error={emailError} errMessage={emailErrorMessage} onChange={handleEmail} value={email} name="email" type="email" icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
      <SignInput label="Create password" eyeAble={true} autoComplete="new-password" error={passwordLengthError||passwordMatchError} name="password1" errMessage="Please check again" onChange={handlePassword1} value={password1} type="password" icon="icon-password.svg" placeholder="At least 8 characters"/>
      <SignInput label="Confirm password" eyeAble={true} autoComplete="new-password"  name="password2" type="password" onChange={handlePassword2} value={password2} icon="icon-password.svg" placeholder="At least 8 characters"/>
      <p className="pt-1 pb-4">Password must contain at least 8 characters</p>
      <SaveButton active={status!=="pending"} text="Create new Account"  small={false} onClick={onSubmit}/>
      </form>

      {/* <RealSpinner/> */}
      
      <div className="grid md:flex text-center my-6 items-center justify-center"> 
        <span className="text">Already have an account?</span>
        <NavLink className="text-NeonBlue" to="/">Login</NavLink>
      </div>
    </div>
  );
}


export default CreateAccount;




