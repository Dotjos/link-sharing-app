export async function signInWithEmail(email,password) {
    try{
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error){
            throw new Error(`Authentication failed:${error.message}`)
        }
        console.log('Authentication successful:', user);
        return user
    }catch(error){
        console.error(error)
    }
}

export  async function signOut() {
    try {
        const { error } = await supabase.auth.signOut() 
    } catch (error) {
        console.error(error)

    }
}