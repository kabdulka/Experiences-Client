import { createSlice } from "@reduxjs/toolkit";

// import { PostType } from '../../types/post';
import { getPosts, signIn, signUp } from '../../api';


const initialState = {
    authData: null,
    // currentPostId: null,
    loading: false,
    error: ""
}

const signInInitialState = {
    loading: false,
    error: "",
    // Additional fields specific to sign-in initial state if needed
  };
  
  const signUpInitialState = {
    loading: false,
    error: "",
    // Additional fields specific to sign-up initial state if needed
  };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            console.log("Data stored in authData:", action.payload);
            state.authData = action.payload;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        },
        logout: (state, action) => {
            localStorage.clear();
            state.authData = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(signIn.pending, (state) => {
            state.loading = true;
          })
          .addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.authData = action.payload;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.error = null;
          })
          .addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "An error occurred during sign-in";
          })
          .addCase(signUp.pending, (state) => {
            state.loading = true;
          })
          .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.authData = action.payload;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.error = null;
          })
          .addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "An error occurred during sign-up";
          });
      },
})

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer