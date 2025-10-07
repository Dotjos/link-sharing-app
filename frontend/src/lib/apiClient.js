const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiClient(path, { method = "GET", body, headers = {} } = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, options);

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        error: data?.error || data?.message || "Something went wrong",
      };
    }

    return data;
  } catch (err) {
    console.error("API call failed:", err);
    // Ensure errors always have a structured shape
    throw err.status
      ? err
      : { status: 500, error: err.message || "Network or server error" };
  }
}

export default apiClient;
