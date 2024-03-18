import { useEffect, useMemo, useState, useCallback } from "react"
import { CircularProgress, Paper, Typography, Divider} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
// import * as moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";
import { loadingPaperStyle } from "./styles";
import { getPost, searchPosts } from "../../api";
import { useTheme } from "@mui/system";
import "../PostDetails/PostDetails.scss"

const PostDetails = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)

  const { post, loading, error, recommendedPosts } = useAppSelector((state) => state.postsReducer);
  // const { recommendedPosts } = useAppSelector((state) => state.postsReducer);
  // const [recommendedPosts, setRecommendedPosts] = useState(useAppSelector((state) => state.postsReducer.recommendedPosts)); 
  // console.log("Posts top", posts)
  // console.log("Post is", post)
  const [fetched, setFetched] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPost = async () => {

      await dispatch(getPost(id));
      setFetched(true)
    }
    fetchPost();
  }, [id])

  useEffect(() => {
    setFetched(false);
  }, [])

  useEffect(() => {
    if (post) {
      // updates posts state
      console.log("pageDetails - post.tags", post.tags);
      dispatch(searchPosts({search: "none", tags: post?.tags.join(",")}));
    }
    
  }, [post]);

  if (!post) {
    return null;
  }

  const openPost = (_id: string) => {
    navigate(`/posts/${_id}`)
  }
  
  const posts = recommendedPosts.filter(({_id}) => _id !== post._id);

  if (loading) {
    return <Paper elevation={6} style={loadingPaperStyle}> <CircularProgress size="7em"/> </Paper>
  }

  return (
    <Paper style={{ padding: "1.25rem", borderRadius: "0.95rem" }} elevation={6}>
      <div className="post-details">
        <div style={{
           borderRadius: '20px',
           margin: '10px',
           flex: 1,
        }}>

          <Typography variant="h3" component="h2"> {post?.title} </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2"> {post.tags.map((tag) => `#${tag} `)} </Typography>
          <Typography gutterBottom variant="body1" color="textSecondary" component="p"> {post.message} </Typography>
          <Typography variant="h6"> Created by: {post.name} </Typography>
          <Typography variant="body1"> {moment(post.createdAt).fromNow()} </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
          <Typography variant="body1"> <strong> Realtime Chat - coming soon! </strong> </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
          <Typography variant="body1"> <strong> Comments - coming soon! </strong> </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
        </div>

        <div className="image-container">
        {typeof post?.file === 'string' ? (
          <img src={post?.file} style={{
              borderRadius: '20px',
              objectFit: 'cover',
              width: '100%',
              maxHeight: '400px',
            }} 
          />
        ) : (

          <span>File preview not available</span>
        )}
    </div>

      </div>
   
      { posts?.length && (
          <div className="section">

            <Typography gutterBottom variant="h5"> You might also like: </Typography>
            <Divider />

            <div className="recommended-posts">
              {
                posts?.map(({title, message, name, likes, file, _id}) => (
                  <div className="recommended-post" key={_id} onClick={() => openPost(_id)}>
                    
                    <Typography gutterBottom variant="h6"> {title} </Typography>
                    <Typography gutterBottom variant="subtitle2"> {name} </Typography>
                    <Typography gutterBottom variant="subtitle2"> {message} </Typography>
                    <Typography gutterBottom variant="subtitle2"> Likes: {likes.length} </Typography>
                    {
                      typeof file === 'string' && 
                        <img className="recommended-post__image" src={file} />
                    }
                  </div>
                ))
              }
            </div>
            
          </div>
        )}
    </Paper>
    
  )
}

export default PostDetails
