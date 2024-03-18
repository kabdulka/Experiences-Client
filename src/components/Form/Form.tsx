import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import './form.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
// import {useDropzone} from 'react-dropzone'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updatePost, createPost, getPosts } from "../../api";
import { setCurrentPostId } from "../../redux/post/postSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Form: React.FC= () => {

    const user = JSON.parse(localStorage.getItem("profile"));
    // console.log("Form", user)
    // TODO: add preview for the upload image feature (not dropzone)
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const currentId = useAppSelector(state => state.postsReducer.currentPostId);
    const post = useAppSelector((state) => currentId ? state.postsReducer.data.posts.find((p) => p._id === currentId) : null);
    
    const location = useLocation();
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = Number(urlParams.get('page'));
    console.log("PAGE:", page)

    const navigate = useNavigate()
    
    const [postData, setPostData] = useState({
        // user: '',
        title: '',
        message: '',
        tags: [""],
        file: null,
    });

    // console.log(currentId, " Form.tsx");

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    const formStyles: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // alignItems: "flex-start",
        width: "100%",
        gap: "1rem"
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        if (name === "tags") {
            
            const trimmedTags = e.target.value.trim().split(",");
            setPostData({...postData, [name]: trimmedTags})
        } else {

            setPostData({...postData, [name]: e.target.value})
        }
        console.log(postData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // TODO 
        // Work on error handling later
        e.preventDefault();
       
        try {
            setLoading(true);        
            if (!currentId) {
                console.log("name of user: ", user?.result?.name)
                await dispatch(createPost({postData: {...postData, name: user?.result?.name}, navigate}));
            } else {
                await dispatch(updatePost({updateData: {...postData, name: user?.result?.name}, id: currentId}));
                await dispatch(getPosts(page));
            }

            // Reset Form
            clear();

        } catch (error) {
          console.error("Error creating post:", error);
          // Handle error, show message to the user, etc.
        } finally {
            setLoading(false);
        }
      };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        clear();
    }

    const clear = (): void => {
        dispatch(setCurrentPostId(null))
        setPostData({
            // user: "",
            title: "",
            message: "",
            tags: [""],
            file: null
        })
        setPreview(null);
    }

    const handleFileChange = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPostData({ ...postData, file: reader.result });
                setPreview(reader.result);
            }
        }
        reader.onerror = error => {
            console.log("Error", error)
        }
    };

    if (!user?.name && !user?.result?.name) {
        return (
            <Paper sx={(theme => ({
                padding: theme.spacing(2),
            }))} elevation={6}>
                <Typography variant="h6" align="center"> Please sign in to create your own Experiences!</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={(theme => ({
            padding: theme.spacing(2),
        }))} elevation={6}>
            {/* TODO fix spacing */}
            <form autoComplete="off" noValidate style={formStyles} onSubmit={handleSubmit} encType="multipart/form-data" action="/upload">
                <Typography className="" variant="h6">
                    {
                        currentId ? `Editing ` : `Creating `
                    } an Experience
                </Typography>
                <TextField  
                    name="title" 
                    variant="outlined" 
                    label="title" 
                    fullWidth
                    value={postData.title}
                    onChange={handleTextChange}
                />
                <TextField  
                    name="message" 
                    variant="outlined" 
                    label="message" 
                    fullWidth
                    value={postData.message}
                    onChange={handleTextChange}
                />
                <TextField  
                    name="tags" 
                    variant="outlined" 
                    label="tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={handleTextChange}
                />
                <input style={{width: "100%"}} type="file" accept="image/*" onChange={handleFileChange} />

                {/* <div> */}
                    {
                        preview && (
                            <div className="message-form-preview">
                                <img className="message-form-preview-image" 
                                    alt="message-form-preview"
                                    src={preview} 
                                    // onLoad frees up resources when image not needed anymore
                                    onLoad={() => URL.revokeObjectURL(preview)}
                                />
                                <CloseIcon 
                                    className="message-form-icon-x"
                                    onClick={() => {
                                        setPreview("");
                                    }}
                                />
                            </div>
                        )
                    }
                {/* </div> */}
                {loading && <CircularProgress />}
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;