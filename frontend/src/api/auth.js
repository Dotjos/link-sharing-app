import apiClient from "../lib/apiClient"

export async function signInWithEmail({email,password}) {
    try{
        const data = await apiClient("/auth/login",{
            method:"POST",
            body:{email,password},
        })
        localStorage.setItem("token", data.token);
        return data.user;
    }catch(error){
        console.error("Login failed:", error);
        throw error
    }
}

export async function SignNewUser(email, password) {
  return apiClient("/auth/signup", {
    method: "POST",
    body: { email, password },
  });
}
 
export  async function signOut() {
    try {
        await apiClient("/auth/logout",{
            method:"POST"
        })

        localStorage.removeItem("token");
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getCurrentUser() {
   try{
    const token = localStorage.getItem("token");
    if (!token) return null;

    const data = await apiClient("/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.user;
   } catch (error){
    console.error("Error fetching current user:", error);
    return null; // safer than throwing here
   }
}