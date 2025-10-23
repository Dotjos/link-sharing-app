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
 
export async function getCurrentUser() {
  const data = await apiClient("/auth/me");
    return data.user;
} 
