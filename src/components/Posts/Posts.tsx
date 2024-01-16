import Post from "./Post/Post";
import { useAppSelector } from "../../redux/hooks";

const Posts = () => {

    const posts = useAppSelector(state => state.postsReducer.data);
    console.log(posts)
    return (
        <>
            <h1> Posts  </h1>
            <Post />
            <Post />
        </>
    );
};

export default Posts;