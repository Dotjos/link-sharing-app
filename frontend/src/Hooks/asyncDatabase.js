import apiClient from "../lib/apiClient";

export async function saveUserLinkData({ id, linkdetails }) {
  return apiClient("/userdata/links", {
    method: "POST",
    body: { id, linkdetails },
  });
}

export async function saveUserData({ first_name, last_name,  }) {
  return apiClient("/userdata/update-profile/", {
    method: "PATCH",
    body: {  first_name, last_name,  },
  });
}
  
export async function fetchUserData(userId) {
  return apiClient(`/userdata/links/${userId}`, { method: "GET" });
}

export async function uploadFile(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  return apiClient("/userdata/upload-profile", {
    method: "POST",
    body: formData,
  });
}



