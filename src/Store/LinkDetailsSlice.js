import {  createSlice } from "@reduxjs/toolkit";

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
        saveLink: (state) => {
          return {
            ...state,
            LinkDetails: state.LinkDetails.map(linkDetail => {
              if (!linkDetail.details || !linkDetail.details.linkInput) {
                const isStringEmpty=  !linkDetail.details?.linkInput
                return {
                  ...linkDetail,
                  details: {
                    ...linkDetail.details,
                    error: isStringEmpty?"Can't be empty":""
                  },
                };
              } else {
                const checkFormat = new RegExp(linkDetail.details.platFormat).test(linkDetail.details.linkInput);
                return {
                  ...linkDetail,
                  details: {
                    ...linkDetail.details,
                    error: checkFormat ? "" : "Please check URL",
                    link: checkFormat? linkDetail.details.linkInput : ""
                  },
                };
              }
            }),
          };
        },
        reOrganizeState:(state,action)=>{
          const { sourceId, targetId } = action.payload;
          const updatedLinkDetails = [...state.LinkDetails];
          const sourceIndex = updatedLinkDetails.findIndex(link => link.linkId === sourceId);
          const targetIndex = updatedLinkDetails.findIndex(link => link.linkId === targetId);


          if (sourceIndex !== -1 && targetIndex !== -1) {
            const [movedLink] = updatedLinkDetails.splice(sourceIndex, 1);
            updatedLinkDetails.splice(targetIndex, 0, movedLink);
          }
          return { ...state, LinkDetails: updatedLinkDetails };
        },
        setUserData:(state,action)=>{
          state.LinkDetails=action.payload
        }
},
})


export const {AddLinkDetails,removeLink,addPersonaLink,saveLink,createLinkObject,reOrganizeState,setUserData}=LinkDetailsSlice.actions
export default LinkDetailsSlice.reducer