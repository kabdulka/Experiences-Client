import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import './form.scss'
import CloseIcon from '@mui/icons-material/Close';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useEffect } from "react";
// import {useDropzone} from 'react-dropzone'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updatePost, createPost, getPosts } from "../../api";
// import { FormPostType } from "../../types/post";
import { setCurrentPostId } from "../../redux/post/postSlice";

const Form: React.FC= () => {
    // TODO: add preview for the upload image feature (not dropzone)
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const currentId = useAppSelector(state => state.postsReducer.currentPostId);
    const post = useAppSelector((state) => currentId ? state.postsReducer.data.find((p) => p._id === currentId) : null);
    // const [attachment, setAttachment] = useState<File | string | undefined>();
    const [postData, setPostData] = useState({
        user: '',
        title: '',
        message: '',
        tags: [""],
        file: null,
    });

    console.log(currentId, " Form.tsx");

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    // const onDrop = useCallback ((acceptedFiles: File[]) => {

    //     if (acceptedFiles.length > 0) {
    //         const file = acceptedFiles[0];
    //         console.log(acceptedFiles);
    //         setPostData({...postData, file: file})

    //         // create a preview URL for the dropped file
    //         const previewURL = URL.createObjectURL(file);
    //         setPreview(previewURL);
    //     }
    // }, [postData]);

    // const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
    //     // accept: '.jpeg, .jpg, .png',
    //     multiple: false,
    //     noClick: true,
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     onDrop: onDrop as any
    // });

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
            // console.log("tags")
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
                await dispatch(createPost(postData));
            } else {
                await dispatch(updatePost({updateData: postData, id: currentId}));
            }
            await dispatch(getPosts());

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
            user: "",
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
                    name="user" 
                    variant="outlined" 
                    label="user" 
                    fullWidth
                    value={postData.user}
                    onChange={handleTextChange}
                />
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
                {/* TODO make input show preview */}
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
                    {/* <div className="message-form-icons">
                
                        <div {...getRootProps()}>              
                            <input {...getInputProps()} type="file" name="file" onChange={handleFileChange}/>
                            <div className="dropzone-content__container">

                            <AttachFileIcon
                                className="message-form-icon-clip"
                                onClick={open}
                            />
                            {
                                isDragActive ? (
                                    <p className="dropzone-content"> Drop the files here ... </p> ):(
                                    <p className="dropzone-content">Drag and drop the files here, or click to select files </p> )
                            }        
                            </div>
                        </div>
                    </div> */}
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