import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormPostType, PostType } from '../types/post';

const url = `http://localhost:5500/posts`;

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

export {
    getPosts,
    createPost,
}

