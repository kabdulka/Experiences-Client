import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormPostType } from '../types/post';

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

interface CreatePostPayload {
    postData: FormPostType;
    navigate: Function; // Add navigate as an argument
  }

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

type searchQueryType = {
    tags: string
    search: string
}

interface signIn {
    formData: formDataType
}

interface signUp {
    formData: formDataType
}

const getPosts = createAsyncThunk("posts/getPosts", async (page: number) => {

    try {
        const response = await API.get(`/posts?page=${page}`);
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const getPost = createAsyncThunk("posts/getPost", async(id: string) => {
    try {
        console.log(id)
        const response = await API.get(`/posts/${id}`);
        console.log("get post", response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const createPost = createAsyncThunk("posts/sendPost", 
    // async (postData: FormPostType) => {
    async ({ postData, navigate }: CreatePostPayload) => {
    
    try {
        console.log("postData", postData)
        const response = await API.post(`/posts`, postData);
        console.log(response.data)
        navigate(`/posts/${response.data._id}`);
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
            console.log("inside delete post index.ts", response.data)
            return id;
        } catch (error) {
            console.log(error)
        }
    }
);

const likePost = createAsyncThunk("post/likePost", 
    async (id: string) => {
        try {            
            const response = await API.patch(`${url}/${id}/like`);
            console.log("likepost", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const searchPosts = createAsyncThunk("post/searchPosts",  async (searchQuery: searchQueryType) => {
    try {
        console.log("searchQuery", searchQuery)
        
        const response = await API.get(`/posts/search?searchQuery=${searchQuery?.search || 'none'}&tags=${searchQuery?.tags}`);
        console.log("Search posts", response);
        // return response.data;
        return response.data;
    } catch (error) {
        console.log(error);
    }
})


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
    getPost,
    searchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    signIn,
    signUp,
}

