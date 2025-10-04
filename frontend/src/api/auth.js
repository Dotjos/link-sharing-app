import apiClient from "../lib/apiClient"

export async function signInWithEmail({ email, password }) {
    return apiClient("/auth/login", {
      method: "POST",
      body: { email, password },
    });
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
  const token = localStorage.getItem("token");
  if (!token) return null; // no token, no user


  const data = await apiClient("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.user;
 } 
