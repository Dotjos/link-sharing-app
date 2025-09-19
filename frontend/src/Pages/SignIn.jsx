import {  Outlet } from "react-router-dom";

function SignIn (){
  return (
    <div className="p-6 text-sm text-Nickel bg-white h-screen md:flex md:flex-col md:bg-whiteFA md:justify-center md:items-center">
      <img src="logo-devlinks-large.svg"/>
      <main className="mt-14 md:w-2/4 bg-white md:p-7 md:rounded-lg">
        <Outlet/>
      </main>
      
    </div>
  );
}

export default SignIn;
