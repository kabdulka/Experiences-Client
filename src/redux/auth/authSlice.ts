import { createSlice } from "@reduxjs/toolkit";

// import { PostType } from '../../types/post';
import { getPosts } from '../../api';

// export interface PostsData {
//     data: null | PostType[]
//     currentPostId: string | null
//     loading: boolean
//     error: string | null
// }

const initialState = {
    authData: null,
    // currentPostId: null,
    loading: false,
    error: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            console.log("Data stored in authData:", action.payload);
            localStorage.setItem("profile", JSON.stringify({...action?.payload}))
            state.authData = action.payload;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.authData = action.payload;
        }
    },
    // extraReducers(builder) {
    //     builder
    //     .addCase(getPosts.pending, (state) => {
    //         state.loading = true
    //     })
        // .addCase(getPosts.fulfilled, (state, action) => {
        //     state.loading = false
        //     // state.data = action.payload
        //     state.data = [...action.payload];
        //     state.error = null
        // })
        // .addCase(getPosts.rejected, (state, action) => {
        //     state.loading = false
        //     state.data = []
        //     state.error = action.error?.message || "An error occured"
        // })
    // }
})

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer