import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { CircularProgress } from '@mui/material';
import { Grid } from "@mui/material";

const Posts = () => {

    const posts = useAppSelector(state => state.postsReducer.data);
    console.log(posts)
    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post.id} item xs={12} sm={6}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;