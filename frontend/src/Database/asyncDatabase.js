import apiClient from "../lib/apiClient";

export async function saveUserLinkData({ id, linkdetails }) {
  return apiClient("/userdata/links", {
    method: "POST",
    body: { id, linkdetails },
  });
}

export async function saveUserData({ id, first_name, last_name, email }) {
  return apiClient("/userdata", {
    method: "POST",
    body: { id, first_name, last_name, email },
  });
}
  
export async function fetchUserData(userId) {
  return apiClient(`/userdata/links/${userId}`, { method: "GET" });
}

export async function uploadFile({ id, avatarFile }) {
  const formData = new FormData();
  formData.append("file", avatarFile);
  formData.append("userId", id);

  return apiClient("/storage/upload", {
    method: "POST",
    body: formData,
    headers: {}, // no JSON header, FormData handles it
  });
}

export async function updateFile({ id, avatarFile }) {
  const formData = new FormData();
  formData.append("file", avatarFile);
  formData.append("userId", id);

  return apiClient("/storage/update", {
    method: "PUT",
    body: formData,
    headers: {},
  });
}

export async function fetchImageUrl(pathName) {
  return apiClient(`/storage/public-url/${pathName}`, { method: "GET" });
}

