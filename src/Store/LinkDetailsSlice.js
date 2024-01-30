import { createSlice } from "@reduxjs/toolkit";


export const LinkDetailsSlice=createSlice({
    name:"Added Link",initialState:{
        LinkDetails:[]},
        reducers:{
        AddLinkDetails: (state, action) => {
            const { linkId, details } = action.payload
            const containsId=state.LinkDetails.some(item=>item.linkId===linkId)
            if (!containsId) {
                // Add linkId to the order array if not present
                state.LinkDetails = [...state.LinkDetails, action.payload];
              }else{
                const indexToUpdate = state.LinkDetails.findIndex(item => item.id === details.id);
               if (indexToUpdate !== -1) {
                // If the item with the matching ID is found, update it
                state.LinkDetails[indexToUpdate].details = details
              }
            }
   },
        removeLink:(state,action)=>{
            state.LinkDetails = state.LinkDetails.filter(item=>item.linkId!==action.payload)
        }
}
})




export const {AddLinkDetails,removeLink}=LinkDetailsSlice.actions
export default LinkDetailsSlice.reducer