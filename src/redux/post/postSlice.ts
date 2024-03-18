import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../../types/post';
import { getPost, getPosts, searchPosts, likePost, deletePost, updatePost } from '../../api';

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
    post: PostType
    recommendedPosts: PostType[]
}

const initialState: PostsData = {
    data: {
        posts: [],
        currentPage: 0,
        numberOfPages: 0
    },
    recommendedPosts: [],
    post: null,
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
                // ...state.data,
                posts: [...action.payload.posts], 
                currentPage: action.payload.currentPage, 
                numberOfPages: action.payload.numberOfPages, 
            };
            state.error = null;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = { posts: [], currentPage: 0, numberOfPages: 0 };
            state.error = action.error?.message || "An error occured"
        })
        .addCase(getPost.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = {...action.payload};
            state.error = null;
        })
        .addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.post = null;
            state.error = action.error?.message || "An error occured"
        })
        .addCase(searchPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchPosts.fulfilled, (state, action) => {
            console.log("inside post slice", action.payload)
            state.loading = false;
            state.data = {
                ...state.data,
                posts: [...action.payload.posts],
                currentPage: action.payload.currentPage, 
                numberOfPages: action.payload.numberOfPages,
            };
            state.recommendedPosts = [...action.payload.posts]
            state.error = null;
        })
        .addCase(searchPosts.rejected, (state, action) => {
            state.loading = false;
            state.data = { posts: [], currentPage: 0, numberOfPages: 0 };
            state.recommendedPosts = [];
            state.error = action.error?.message || "An error occured searching posts";
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            console.log(action.payload)
            state.data = {
                ...state.data,
                posts: state.data.posts.filter((post) => post._id !== action.payload)
            };            
            console.log("inside delete baby", state.data.posts)
        })
        // .addCase(updatePost.fulfilled, (state, action) => {
        //     console.log(action.payload)
        //     state.data = {
        //         ...state.data,
        //         posts: [...action.payload], 
        //     };            
        //     console.log("inside update Post baby", state.data.posts)
        // });
    },
    
})

export const { setCurrentPostId } = postsSlice.actions;
export default postsSlice.reducer