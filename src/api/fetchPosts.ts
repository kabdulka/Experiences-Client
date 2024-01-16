import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = `http://localhost:5500/posts`;

const getPosts = createAsyncThunk("posts", async () => {
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export {
    getPosts,
}

// export const fetchPosts = () => axios.get(url)