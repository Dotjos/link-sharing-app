import { createSlice } from "@reduxjs/toolkit";

export const ProfileDetailsSlice = createSlice({name:"ProfileDetailsSlice",
    initialState:{firstName:"",lastName:"",email:"",errFirstName:"",errLastName:"",confirmFirstName:"",confirmLastName:"",imgURL:""},
    reducers:{
        UpdateProfileDetails:(state,action)=>{
            const {firstName,lastName,email,imgURL}=action.payload
            
            if(firstName){
                state.firstName=firstName
            }
             
            if(lastName){
                state.firstName=firstName
            }

            if(email){
                state.firstName=firstName
            }

            if(imgURL){
                state.imgURL=imgURL
            }

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
        },
        setProfileData:(state,action)=>{
           const {first_name,last_name,email}=action.payload
           state.firstName=first_name
           state.lastName=last_name
           state.email=email
        }
    }})


    export const {UpdateProfileDetails,setProfileData}=ProfileDetailsSlice.actions
    export default ProfileDetailsSlice.reducer