import { Card, Typography, CardActions, CardMedia, Button, CardContent, ButtonBase } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import { PostType } from "../../../types/post";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCurrentPostId } from "../../../redux/post/postSlice";
import { deletePost, getPosts, likePost, updatePost } from "../../../api";
import { CSSProperties, useEffect } from "react";
import { ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PostProps {
    post: PostType
}

const Post: React.FC<PostProps> = ({post}) => {

    const user = JSON.parse(localStorage.getItem("profile"));
    console.log("render");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const posts = useAppSelector((state) => state.postsReducer.data.posts);

    console.log("post.likes:", post?.likes)
    const [likes, setLikes] = useState<string[]>(post?.likes);
    console.log("likes", likes);
    // const liked = post.likes.includes(user?.result?._id);

    const userId = user?.result?._id;

    const handleLike = async () => {
        try {
            if (!user) {
                // User is not logged in, handle accordingly
                return;
            }
    
            // Check if the user has already liked the post
            const hasLikedPost = likes.includes(user?.result?._id);
    
            let updatedLikes;
    
            if (hasLikedPost) {
                // If the user has already liked the post, remove their like
                updatedLikes = likes.filter((id) => id !== user?.result?._id);
            } else {
                // If the user hasn't liked the post, add their like
                updatedLikes = [...likes, user?.result?._id];
            }
    
            // Update the local state with the new likes
            setLikes(updatedLikes);
    
            // Dispatch an action to update the post with the new likes
            await dispatch(updatePost({ updateData: { ...post, likes: updatedLikes }, id: post._id }));
        } catch (error) {
            console.error("Error handling like:", error);
            // Handle error if needed
        }
    };

    const handleDelete2 = async () => {

    }

    // useEffect(() => {
    //     console.log("Updated likes:", likes);
    // }, [likes]);

    const Likes = () => {
        if (likes.length > 0) {
            console.log("inslide function", likes)
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAlt fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpOffAlt fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpOffAlt fontSize="small" />&nbsp;Like</>;
    };

    const didUserCreatePost = () => {
        if (userId === post?.user) {
            return true;
        }
        return false
    }

    const media: CSSProperties = {
        height: 0,
        paddingTop: '75.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    }

    const card: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '1rem',
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

    const handleEditPost = (event) => {
        event.stopPropagation();
        dispatch(setCurrentPostId(post._id));
        // dispatch(getPosts(1));
    }

    const handleDelete = async () => {
        try {

            await dispatch(deletePost(post._id));
        } catch(error) {
            console.error('Error deleting post:', error);

        }
    }

    const openCard = () => {
        navigate(`/posts/${post._id}`);
    }

    return (
        <>
            <Card sx={card} raised elevation={6}>
                <ButtonBase onClick={openCard} sx={{
                        display: 'block',
                        textAlign: 'initial',
                }}>
                    
                    <CardMedia sx={media} image={typeof post.file === 'string' ? post.file : undefined} title={post.title}/>
                    <div style={overlay}>
                        <Typography variant="body2"> {post?.name} </Typography>
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
                        <Typography variant="body2" color="textSecondary" component="p">  {post.message.split(' ').splice(0, 20).join(' ')}...  </Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions sx={cardActions}>
                    <Button disabled={!user} size="small" color="primary" onClick={handleLike}>
                        <Likes />
                        {/* {liked ? `${post.likes.length + 1} Likes` : `${post.likes.length} Likes`} */}

                    </Button>
                    {
                        didUserCreatePost() && 
                        (
                            <Button disabled={!didUserCreatePost()} size="small" color="secondary" onClick={handleDelete}>
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