import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormPostType } from '../types/post';
// import { History } from '@remix-run/router';
import { useNavigate } from 'react-router-dom';

const url = `http://localhost:5500/posts`;

const API = axios.create({ baseURL: `http://localhost:5500`});

API.interceptors.request.use((req) => {
    // happens before all requests
    // send back token for backend middleware can verify user is logged in
    if (localStorage.getItem(("profile"))) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req; // return this request to make future requests
});

interface UpdatePostPayload {
    updateData: FormPostType;
    id: string;
}

type formDataType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

interface signIn {
    formData: formDataType
}

interface signUp {
    formData: formDataType
}

const getPosts = createAsyncThunk("posts/getPosts", async () => {
    try {
        const response = await API.get(`/posts`);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const createPost = createAsyncThunk("posts/sendPost", 
    // async (postData: FormPostType) => {
    async (postData: FormPostType) => {
    try {
        console.log("postData", postData)
        const response = await API.post(`/posts`, postData);

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
        const response = await API.patch(`${`/posts/`}${id}`, updateData);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const deletePost = createAsyncThunk("post/deletePost", 
    async (id: string) => {
        try {
            const response = await API.delete(`${url}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

const likePost = createAsyncThunk("post/likePost", 
    async (id: string) => {
        try {
            const response = await API.patch(`${url}/${id}/like`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const signIn = createAsyncThunk("auth/signin", 
    async ({formData}: signIn) => {
        try {
            //
            const { data } = await API.post(`/users/signin`, formData);
            console.log(data)
            return data;
        } catch (error) {
            //
            console.log(error)
        }
    }
)
    
const signUp = createAsyncThunk("auth/signup", 
    async ({formData}: signUp) => {
        try {
            //
            const { data } = await API.post(`/users/signup`, formData);
            console.log(data)
            return data;
        } catch (error) {
            //
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
    signIn,
    signUp,
}

