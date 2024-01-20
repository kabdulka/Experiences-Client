// import { useState } from 'react'

import './App.scss'
import { Container, Typography, Grow, Grid, createTheme } from '@mui/material';
import experiences from './images/experiences.jpeg'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { StyledAppBar, imgStyle, headingStyle } from './styles';
import { getPosts } from './api';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { Theme, useTheme } from '@mui/system';
import { CSSProperties } from '@mui/material/styles/createMixins';

const App: React.FC = () => {
  
  const dispatch = useAppDispatch();
  
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 800,
        lg: 1280,
        xl: 1920,
      },
    },
  })

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <StyledAppBar position='static' color="inherit" >
        <Typography style={headingStyle} variant='h2' align='center'> Experiences </Typography>
        <img style={imgStyle} src={experiences} alt="Experiences" height="60"/>
      </StyledAppBar>
      <Grow in>
        <Container>
          <Grid  sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column-reverse',
            },
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column-reverse',
            },
            // [theme.breakpoints.down('lg')]: {
            //   flexDirection: 'column-reverse',
            // }
        }}  container justifyContent="space-between" alignItems="stretch" spacing={3}> 
            <Grid item xs={12} sm={12} md={7}>  
              <Posts />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>  
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
