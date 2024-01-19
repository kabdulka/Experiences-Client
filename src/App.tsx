// import { useState } from 'react'

import './App.scss'
import { Container, Typography, Grow, Grid } from '@mui/material';
import experiences from './images/experiences.jpeg'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { StyledAppBar, imgStyle, headingStyle } from './styles';
import { getPosts } from './api';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  // const currentId = useAppSelector(state => state.postsReducer.currentPostId);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  // console.log(posts)

  return (
    <Container maxWidth="lg">
      <StyledAppBar position='static' color="inherit" >
        <Typography style={headingStyle} variant='h2' align='center'> Experiences </Typography>
        <img style={imgStyle} src={experiences} alt="Experiences" height="60"/>
      </StyledAppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}> 
            <Grid item xs={12} sm={7}>  
              <Posts />
            </Grid>
            <Grid item xs={12} sm={5}>  
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
