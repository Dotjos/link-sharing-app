const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiClient(path, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("token"); 

  const isFormData = body instanceof FormData;

  const options = {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
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
    throw err.status
      ? err
      : { status: 500, error: err.message || "Network or server error" };
  }
}

export default apiClient;


