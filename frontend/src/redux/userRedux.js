import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart: (state)=>{state.isFetching = true},
        loginSucess: (state, actions)=>{
            state.isFetching=false;
            state.currentUser = actions.payload;
        },
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
          },
    },
});

export const {loginStart,loginSucess,loginFailure, logOut} = userSlice.actions;
export default userSlice.reducer;