import { createSlice } from "@reduxjs/toolkit";

export const ProfileDetailsSlice = createSlice({
  name: "ProfileDetailsSlice",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    imgURL: "",
  },
  reducers: {
    updateProfileDetails: (state, action) => {
      const { firstName, lastName, email, imgURL } = action.payload;
      console.log(action.payload);

      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (email !== undefined) state.email = email;
      if (imgURL !== undefined) state.imgURL = imgURL;
    },
  },
});

export const { updateProfileDetails } = ProfileDetailsSlice.actions;
export default ProfileDetailsSlice.reducer;
