import { createSlice } from "@reduxjs/toolkit";


export const LinkDetailsSlice=createSlice({
    name:"Added Link",initialState:{
        LinkDetails:[]},
        reducers:{
        createLinkObject:(state,action)=>{
          if(!state.LinkDetails.some(item=>item.linkId===action.payload))
          state.LinkDetails=[...state.LinkDetails,{linkId:action.payload}]
        },
        AddLinkDetails: (state, action) => {
            const { linkId, details } = action.payload
            const containsIdIndex=state.LinkDetails.findIndex(item=>item.linkId===linkId)
            state.LinkDetails[containsIdIndex].details = details
   },
        removeLink:(state,action)=>{
            state.LinkDetails = state.LinkDetails.filter(item=>item.linkId!==action.payload)
        },
        addPersonaLink:(state,action)=>{
          const linkToBeUPdated=state.LinkDetails.find(item=>item.linkId===action.payload.linkId)
          if (linkToBeUPdated) {
            // If the item with the matching linkId is found
            linkToBeUPdated.details.linkInput = action.payload.linkInput;
          }
        },
        saveLink:(state)=>{
           state.LinkDetails.forEach(linkDetail=>{
            if(!linkDetail.details.linkInput
              ){
            linkDetail.details.error="Can't be empty"
          }
           })
        }
        // saveLink: (state) => {
        //   state.LinkDetails.forEach((linkDetail) => {
        //     if (
        //       !linkDetail.details.linkInput &&
        //       !linkDetail.details.inputDisabled // Assuming there's a property indicating if the input is disabled
        //     ) {
        //       linkDetail.details.error = "Can't be empty";
        //     }
        //   });
        // },
}
})


export const {AddLinkDetails,removeLink,addPersonaLink,saveLink,createLinkObject}=LinkDetailsSlice.actions
export default LinkDetailsSlice.reducer