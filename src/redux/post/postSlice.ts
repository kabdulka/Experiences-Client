import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../../types/post';
import { getPosts } from '../../api';

export interface PostsData {
    data: null | PostType[]
    loading: boolean
    error: string | null
}

const initialState: PostsData = {
    data: [],
    loading: false,
    error: ""
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getPosts.pending, (state) => {
            state.loading = true
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false
            // state.data = action.payload
            state.data = [...action.payload];
            state.error = null
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error?.message || "An error occured"
        })
    }
})

export default postsSlice.reducer