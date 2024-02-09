import { createSlice } from "@reduxjs/toolkit";

export const ProfileDetailsSlice = createSlice({name:"ProfileDetailsSlice",
    initialState:{firstName:"",lastName:"",email:"",errFirstName:"",errLastName:"",confirmFirstName:"",confirmLastName:"",imgURL:""},
    reducers:{
        UpdateProfileDetails:(state,action)=>{
            const {firstName,lastName,email,imgURL}=action.payload
            state.firstName=firstName
            state.lastName=lastName
            state.email=email
            state.imgURL=imgURL

            if(!firstName) {
                state.errFirstName="Can't be blank"
                state.confirmFirstName=""
            }else{
                state.errFirstName=""
                state.confirmFirstName=state.firstName
            }
            if(!lastName){
                state.errLastName="Can't be blank"
                state.confirmFirstName=""
            }else{
                state.errLastName=""
                state.confirmLastName=state.lastName
            }
        }
    }})


    export const {UpdateProfileDetails}=ProfileDetailsSlice.actions
    export default ProfileDetailsSlice.reducer