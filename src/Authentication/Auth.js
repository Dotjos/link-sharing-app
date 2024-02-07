import { supabase } from "../Supabase";

export async function signInWithEmail({email,password}) {
    try{
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error){
            throw new Error(error.message)
        }
        return user
    }catch(error){
        console.error(error)
        throw error
    }
}


export async function SignNewUser( email, password ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message);
      }
  
      console.log("Sign up successful:", data);
      return data;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  }
  











export  async function signOut() {
    try {
        const { error } = await supabase.auth.signOut() 
        if (error){
            throw new Error(`Signing out failed${error.message}`)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}