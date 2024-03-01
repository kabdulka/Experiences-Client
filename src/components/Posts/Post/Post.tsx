import { Card, Typography, CardActions, CardMedia, Button, CardContent } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
// import * as moment from "moment";
import { PostType } from "../../../types/post";
import { useAppDispatch } from "../../../redux/hooks";
import { setCurrentPostId } from "../../../redux/post/postSlice";
import { deletePost, getPosts, likePost } from "../../../api";
import { CSSProperties } from "react";
import { ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";

interface PostProps {
    post: PostType
}

// TODO check if current user created the post

const Post: React.FC<PostProps> = ({post}) => {

    const user = JSON.parse(localStorage.getItem("profile"));
    
    const dispatch = useAppDispatch();

    console.log(post);

    const Likes = () => {
        // post has at least 1 like
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) 
                ? ( 
                    <> <ThumbUpAlt fontSize="small"/> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`} </> 
                ) : (
                    <> <ThumbUpOffAlt fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} </>
                )
        }

        return <> <ThumbUpAlt fontSize="small"/> {` Like`} </>
    }

    const didUserCreatePost = () => {
        if (user?.result?._id === post?.user) {
            console.log("user created post");
            return true;
        }
        console.log("user didn't create post");
        return false
    }

    const media: CSSProperties = {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    }

    const card: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    }

    const overlay: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    }

    const overlay2: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    }

    const details: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
    }

    const title: React.CSSProperties = {
        padding: '0 16px',
    }

    const cardActions: React.CSSProperties = {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    }

    const handleEditPost = () => {
        dispatch(setCurrentPostId(post._id));
    }

    const handleLike = async () => {
        await dispatch(likePost(post._id));
        await dispatch(getPosts());
    }

    const handleDelete = async () => {
        await dispatch(deletePost(post._id));
        await dispatch(getPosts());
    }

    return (
        <>
            <Card sx={card}>
                <CardMedia sx={media} image={typeof post.file === 'string' ? post.file : undefined} title={post.title}/>
                <div style={overlay}>
                    <Typography variant="h6"> {post?.name} </Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
                </div>
                <div style={overlay2}>
                    {
                        didUserCreatePost() && (
                            <Button style={{color: "white"}} size="small" onClick={handleEditPost} > 
                                <MoreHorizIcon sx={{fontSize: "default"}} />
                            </Button>
                        )
                    }
                </div>
                <div style={details}>
                    <Typography variant="body2" color="textSecondary"> 
                        {
                            post.tags.filter((tag) =>  tag !== '').map(tag => `#${tag} `)
                        }
                    </Typography>
                </div>
                <Typography sx={title} variant="h5" gutterBottom> { post.title } </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"> { post.message } </Typography>
                </CardContent>
                <CardActions sx={cardActions}>
                    <Button disabled={!user} size="small" color="primary" onClick={handleLike}>
                        <Likes />
                    </Button>
                    {
                        didUserCreatePost() && 
                        (
                            <Button disabled={!didUserCreatePost()} size="small" color="primary" onClick={handleDelete}>
                                <DeleteIcon fontSize="small"/>
                                Delete
                            </Button>
                        )
                    }
                </CardActions>
            </Card>
        </>
    );
};

export default Post;