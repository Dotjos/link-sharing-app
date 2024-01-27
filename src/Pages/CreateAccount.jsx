import { NavLink } from "react-router-dom";
import SaveButton from "../Components/SaveButton";
import SignInput from "../ui/SignInput";
import { useState } from "react";
import { getCreateAccount } from "../Async/getCreateAccount";

function CreateAccount (){
  const [email,setEmail]=useState("")
  const [password1,setPassword1]=useState("")
  const [password2,setPassword2]=useState("")
  const [emailError, setEmailError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const passwordError=passwordLengthError||passwordMatchError
  const isFormValid = !emailError&&!passwordError
  const {SignNew,status} =  getCreateAccount()
  const arePasswordsMatching=password1===password2
  

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
    if(email.trim.length===""||password1.length<8){
      console.log('Error Obviously');
    }

    if(email.trim() === ""){
      setEmailError(true)
    }

// Check password length
    if (password1.length < 8) {
         setPasswordLengthError(true);
     }

   // Check password match
      if (!arePasswordsMatching) {
      setPasswordMatchError(true);
      }

    if (isFormValid) {
      // Perform your account creation logic here
      SignNew(email,password1)
      console.log(email,password1);
      console.log(status);
      console.log("Form is valid. Ready to create an account.");
    } else {
      console.log("Form is not valid. Please check the input values.");
    }
  };


  return (
    <div className="">
      <h1 className="font-bold text-xl text-DarkCharcoal my-3">Create Account</h1>
      <p>Let&apos;s get you started sharing your links</p>
      <form>
      <SignInput label="Email address" error={emailError} errMessage="Can't be blank" onChange={handleEmail} value={email} name="email" type="email" icon="icon-email.svg" placeholder="e.g.oladotjos@gmail.com"/>
      <SignInput label="Create password" error={passwordError} name="password1" errMessage="Please check again" onChange={handlePassword1} value={password1} type="password" icon="icon-password.svg" placeholder="At least 8 characters"/>
      <SignInput label="Confirm password" name="password2" type="password" onChange={handlePassword2} value={password2} icon="icon-password.svg" placeholder="At least 8 characters"/>
      <span>Password must contain at least 8 characters</span>
      <SaveButton active={true} text="Create new Account" small={false} onClick={onSubmit}/>
      </form>
      
      <div className="grid md:flex text-center my-6 items-center justify-center"> 
        <span className="text">Already have an account?</span>
        <NavLink className="text-NeonBlue" to="/">Login</NavLink>
      </div>
    </div>
  );
}


export default CreateAccount;




