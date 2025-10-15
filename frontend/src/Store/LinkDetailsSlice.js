import { createSlice } from "@reduxjs/toolkit";

export const LinkDetailsSlice = createSlice({
  name: "LinkDetails",
  initialState: {
    LinkDetails: [],
  },
  reducers: {
    // ✅ Create a new empty link object (used only on initial render or prefetch)
    createLinkObject: (state, action) => {
      const exists = state.LinkDetails.some(
        (item) => item.linkId === action.payload
      );
      if (!exists) {
        state.LinkDetails.push({ linkId: action.payload, details: {} });
      }
    },

    // ✅ Remove a link
    removeLink: (state, action) => {
      state.LinkDetails = state.LinkDetails.filter(
        (item) => item.linkId !== action.payload
      );
    },

    // ✅ Set user data from DB
    setUserLinkData: (state, action) => {
      state.LinkDetails = action.payload || [];
    },

    // ✅ Batch save after local edits
    saveLinkBatch: (state, action) => {
      // action.payload should be the full array of validated links from local state
      const validLinks = action.payload.filter((link) => {
        const input = link?.details?.linkInput?.trim();
        const hasError = link?.details?.error;
        return input && !hasError;
      });
      state.LinkDetails = validLinks;
    },

  },
});

export const {
  createLinkObject,
  removeLink,
  setUserLinkData,
  saveLinkBatch,
} = LinkDetailsSlice.actions;

export default LinkDetailsSlice.reducer;
