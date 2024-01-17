import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";
import { CircularProgress } from '@mui/material';
import { Grid } from "@mui/material";
import { PostType } from "../../types/post";

const Posts: React.FC = () => {

    const posts = useAppSelector(state => state.postsReducer.data);
    
    posts?.forEach((post: PostType) => {
        console.log(post)
    })

    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    posts?.map((post) => (
                       
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;