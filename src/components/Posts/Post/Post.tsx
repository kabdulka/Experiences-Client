import { Card, Typography, CardActions, CardMedia, Button, CardContent } from "@mui/material";
import ThumbsUpIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import { PostType } from "../../../types/post";

interface PostProps {
    post: PostType
}

const Post: React.FC<PostProps> = ({post}) => {

    console.log(post.file)

    const media = {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    }

    const card = {
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

    return (
        <>
            <Card sx={card}>
                <CardMedia sx={media} image={typeof post.file === 'string' ? post.file : undefined} title={post.title}/>
                <div style={overlay}>
                    <Typography variant="h6"> {post.user} </Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
                </div>
                <div style={overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={() => {}} > 
                        <MoreHorizIcon sx={{fontSize: "default"}} />
                    </Button>
                </div>
                <div style={details}>
                    <Typography variant="body2" color="textSecondary"> 
                        {
                            post.tags.map((tag) => `#${tag} `)
                        }
                    </Typography>
                </div>
                <CardContent>
                    <Typography sx={title} variant="h5" gutterBottom> { post.message } </Typography>
                </CardContent>
                <CardActions sx={cardActions}>
                        <Button size="small" color="primary" onClick={() => {}}>
                            <ThumbsUpIcon fontSize="small"/>
                            Like
                            {post.likeCount}
                        </Button>
                        <Button size="small" color="primary" onClick={() => {}}>
                            <DeleteIcon fontSize="small"/>
                            Delete
                        </Button>
                </CardActions>
            </Card>
            {/* <img src={post.file}/> */}
        </>
    );
};

export default Post;