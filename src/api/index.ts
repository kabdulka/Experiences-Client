import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postType } from '../types/post';

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
    async (data: postType) => {
    try {
        const response = await axios.post(url, data);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export {
    getPosts,
    createPost,
}

