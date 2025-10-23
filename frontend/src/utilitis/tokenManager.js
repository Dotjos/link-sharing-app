import { refreshAccessToken } from "./refreshToken";

let refreshTimer = null;

export function startTokenRefreshTimer() {
  stopTokenRefreshTimer();
  // 55 minutes (3300000 ms)
  refreshTimer = setTimeout(async () => {
    try {
      await refreshAccessToken(); // same function that calls /auth/refresh
      console.log("✅ Token refreshed automatically");
      startTokenRefreshTimer(); // restart timer
    } catch (err) {
      console.warn("⚠️ Token refresh failed:", err);
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, 55 * 60 * 1000);

}

// export function startTokenRefreshTimer() {
//   console.log("startTokenRefreshTimer");

//   stopTokenRefreshTimer();
//   // ⏱️ TEST MODE: refresh every 30 seconds
//   refreshTimer = setTimeout(async () => {
//     console.log("⏰ Timer fired — about to refresh token");

//     try {
//       console.log("refresh block accessed");
//       await refreshAccessToken();
//       console.log("✅ Token refreshed automatically");
//       startTokenRefreshTimer();
//     } catch (err) {
//       console.log("Emi ni odaran");
//       console.warn("⚠️ Token refresh failed:", err);
//       console.log("emi ni odaran");
//       // window.history.
//     }
//   }, 30 * 1000); // 30 seconds
// }

export function stopTokenRefreshTimer() {
  console.log("stopTokenRefreshTimer");
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = null;
}
