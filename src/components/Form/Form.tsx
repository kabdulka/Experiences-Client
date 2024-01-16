import { TextField, Button, Typography, Paper, Theme, useTheme } from "@mui/material";
import FormStyles from "./styles";
import './form.scss'
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useCallback } from "react";
import {useDropzone} from 'react-dropzone'

const Form: React.FC = () => {
    const [preview, setPreview] = useState<string>("");
    const [attachment, setAttachment] = useState<File | string | undefined>();
    // convert image to base 64 string
    const [postData, setPostData] = useState({
        postOwner: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',

    });

    const onDrop = useCallback ((acceptedFiles: FileList) => {

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            console.log(acceptedFiles);
            setAttachment(file);

            // create a preview URL for the dropped file
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    }, [setAttachment]);

    const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
        accept: '.jpeg, .jpg, .png',
        multiple: false,
        noClick: true,
        onDrop: onDrop
    });

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
        setPostData({...postData, [name]: e.target.value})
        console.log(postData);
    }

    const handleSubmit = () => {
        // Handle submit logic
    }

    const handleClear = (e: SubmitEvent) => {
        e.preventDefault();
    }

    return (
        <Paper sx={(theme => ({
            padding: theme.spacing(2),
        }))} className="">
            {/* TODO fix spacing */}
            <form autoComplete="off" noValidate style={formStyles} onSubmit={handleSubmit}>
                <Typography className="" variant="h6">
                    Creating an Experience
                </Typography>
                <TextField  
                    name="owner" 
                    variant="outlined" 
                    label="owner" 
                    fullWidth
                    value={postData.postOwner}
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
                                        setAttachment("");
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className="message-form-icons">
                
                        <div {...getRootProps()}>              
                            <input {...getInputProps()}/>
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
                    </div>
                {/* </div> */}
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    size="large"
                    // style={{"marginBottom": 10}}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    fullWidth
                    size="large"

                    onClick={(e: SubmitEvent) => handleClear(e)}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;