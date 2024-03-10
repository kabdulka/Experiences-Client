import { useEffect } from "react"
import { CircularProgress, Paper, Typography, Divider, useTheme} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import momnet from "moment";
import * as moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";


const PostDetails = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // useAppDispatch(getPost(id));
  }, [id])

  return (
    <Paper style={{ padding: "1.25rem", borderRadius: "0.95rem" }} elevation={6}>
      <div style={{
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
          },
                      
      }}>
        <div style={{
           borderRadius: '20px',
           margin: '10px',
           flex: 1,
        }}>

          <Typography variant="h3" component="h2"> {post.title} </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2"> {post.tagas} </Typography>
          <Typography gutterBottom variant="body1" color="textSecondary" component="p"> {post.message} </Typography>
          <Typography variant="h6"> Created by: {post.name} </Typography>
          <Typography variant="body1"> {moment(post.createdAt).fromNow()} </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
          <Typography variant="body1"> <strong> Realtime Chat - coming soon! </strong> </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
          <Typography variant="body1"> <strong> Comments - coming soon! </strong> </Typography>
          <Divider style={{margin: "1.25rem 0rem"}}/>
        </div>

        <div>
          <div style={{
                marginLeft: '20px',
                [theme.breakpoints.down('sm')]: {
                  marginLeft: 0,
                }
          }}>
            <img src={post.selectedFile}  
              style={{
                 borderRadius: '20px',
                 margin: '10px',
                 flex: 1,
            }}/>
          </div>
        </div>

      </div>

    </Paper>
  )
}

export default PostDetails
