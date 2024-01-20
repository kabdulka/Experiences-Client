import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormPostType } from '../types/post';

const url = `http://localhost:5500/posts`;

interface UpdatePostPayload {
    updateData: FormPostType;
    id: string;
}


const getPosts = createAsyncThunk("posts/getPosts", async () => {
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const createPost = createAsyncThunk("posts/sendPost", 
    // async (postData: FormPostType) => {
    async (postData: FormPostType) => {
    try {
        const response = await axios.post(url, postData);

        return response.data
    } catch (error) {
        console.log(error)
    }
})

// const createPost = createAsyncThunk("posts/sendPost", 
//     async (postData: FormPostType) => {
//     try {
//         const formData = new FormData();
//         formData.append('user', postData.user);
//         formData.append('title', postData.title);
//         formData.append('message', postData.message);
//         formData.append('tags', postData.tags);
//         if (postData.file) {
//             formData.append('file', postData.file);
//         }
        
//         const response = await axios.post(url, formData);

//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// })

const updatePost = createAsyncThunk("post/updatePost", 
    async ({updateData, id}: UpdatePostPayload) => {
    try {
        const response = await axios.patch(`${url}/${id}`, updateData);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const deletePost = createAsyncThunk("post/deletePost", 
    async (id: string) => {
        try {
            const response = await axios.delete(`${url}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

const likePost = createAsyncThunk("post/likePost", 
    async (id: string) => {
        try {
            const response = await axios.patch(`${url}/${id}/like`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
}

