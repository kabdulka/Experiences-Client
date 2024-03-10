import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { CircularProgress, Typography } from '@mui/material';
import { Grid } from "@mui/material";
import { PostType } from "../../types/post";

const Posts: React.FC = () => {

    const posts = useAppSelector(state => state.postsReducer.data?.posts);
    const isLoading = useAppSelector(state => state.postsReducer?.loading);
    console.log("posts and is loading", posts, isLoading)
    
    if (!posts?.length && !isLoading) {return <Typography variant="h4"> No Posts {`:(`} </Typography>};
    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    posts?.map((post) => (
                       
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;