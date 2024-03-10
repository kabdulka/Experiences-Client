import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../../types/post';
import { getPosts, searchPosts } from '../../api';

type PostDataType = {
    posts: PostType[],
    numberOfPages: number,
    currentPage: number
}

export interface PostsData {
    data: null | PostDataType
    currentPostId: string | null
    loading: boolean
    error: string | null
}

const initialState: PostsData = {
    data: {
        posts: [],
        currentPage: 0,
        numberOfPages: 0
    },
    currentPostId: null,
    loading: false,
    error: ""
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentPostId: (state, action) => {
            state.currentPostId = action.payload
        },
    },
    extraReducers(builder) {
        builder
        .addCase(getPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            // state.data = action.payload
            state.data = {
                ...state.data,
                posts: [...action.payload.posts], // Spread the array of posts
                currentPage: action.payload.currentPage, // Update currentPage
                numberOfPages: action.payload.numberOfPages, // Update numberOfPages
            };
            state.error = null;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = { posts: [], currentPage: 0, numberOfPages: 0 };
            state.error = action.error?.message || "An error occured"
        })
        .addCase(searchPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = {
                ...state.data,
                posts: [...action.payload], // Spread the array of posts
                currentPage: action.payload.currentPage, // Update currentPage
                numberOfPages: action.payload.numberOfPages, // Update numberOfPages
            };
            state.error = null;
        })
        .addCase(searchPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = { posts: [], currentPage: 0, numberOfPages: 0 };
            state.error = action.error?.message || "An error occured searching posts";
        })
    }
})

export const { setCurrentPostId } = postsSlice.actions;
export default postsSlice.reducer