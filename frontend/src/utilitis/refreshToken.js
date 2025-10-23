const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let refreshSubscribers = [];

export function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

export function onTokenRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

export async function refreshAccessToken() {
  console.log("------before");
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // important! sends refresh token cookie
    });

    console.log("-----After");
  
    if (!res.ok) throw new Error("Refresh token expired or invalid");
  
    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    return data.accessToken;
  }


