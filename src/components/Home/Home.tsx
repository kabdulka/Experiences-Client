// import React from "react";
import { Container, Grow, Grid, createTheme } from '@mui/material';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getPosts } from "../../api";

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

const Home: React.FC = () => {

    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getPosts())
    }, [dispatch]);


  return (
    <Grow in>
      <Container>
        <Grid
          sx={{
            // TODO fix responsiveness
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column-reverse",
            },
            [theme.breakpoints.down("md")]: {
              flexDirection: "column-reverse",
            },
          }}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
