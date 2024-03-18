// import React from "react";
import { Container, Grow, Grid, createTheme, Paper, TextField, Button, AppBar, useTheme, Chip } from '@mui/material';
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { useLocation, useNavigate } from 'react-router-dom';
import { MuiChipsInput, MuiChipsInputChip } from 'mui-chips-input';
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getPosts, searchPosts } from "../../api";
import Paginate from '../../components/Pagination/Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Home: React.FC = () => {
    const theme = useTheme()

    const dispatch = useAppDispatch();
    const query = useQuery(); // query gets page info
    const navigate = useNavigate();

    const page = query.get("page") || 1;
    console.log(page);
    const searchQuery = query.get("searchQuery");
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState<MuiChipsInputChip[]>([]);
    
    const handleChange = (newValue: MuiChipsInputChip[]) => {
      
      setTags(newValue)
    }
    
    // useEffect(() => {
    //   dispatch(getPosts())
    // }, [dispatch]);
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'Enter') {
        searchPost();
      }
    }

    const searchPost = () => {
      if (search.trim() || tags) {
         dispatch(searchPosts({search, tags: tags.join(",")}));
         navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
      } else {
        console.log("ami I here?")
        navigate("/");
      }
    }
    
  return (
    <Grow in>
      <Container maxWidth="xl" sx={{
        [theme.breakpoints.down("xs")]: {
          flexDirection: "column-reverse",
        },
      }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar sx={{
                  borderRadius: 4,
                  marginBottom: '1rem',
                  display: 'flex',
                  padding: '16px',
            }}
            position="static"
            color='inherit'
            >
              <TextField 
                name='search'
                variant='outlined'
                label="Search Experiences"
                fullWidth
                onKeyUp={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <MuiChipsInput 
                sx={{
                  margin: "10px 0"
                }}
                value={chips}
                // onAdd={handleAddTag}
                // onDelete={handleDeleteTag}
                onChage={handleChange}
                label="Search Tags"
                variant="outlined"
                hideClearAll
              /> */}
              <MuiChipsInput
                sx={{
                  margin: "10px 0"
                }}
              helperText={tags.length > 0 ? "Double click to edit a chip" : ""}
              clearInputOnBlur
              value={tags}
        
              onChange={handleChange}
            />

            <Button
              color='primary'
              variant='contained'
              onClick={searchPost}
            >
              Search
            </Button>

      {/* <TextField
      sx={{
        marginTop: '1.25rem'
      }}
        label="Add Tag"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
      />
      <Stack direction="row" spacing={1} mt={1}>
        {tags.map((tag) => (
          <Chip
            key={Date.now()+1}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            variant="outlined"
          />
        ))}
      </Stack> */}

            </AppBar>
            <Form /> 
            {
              (!searchQuery && !tags.length) && (

              <Paper elevation={6} 
                sx={{
                  
                    borderRadius: 4,
                    marginTop: '1rem',
                    padding: '16px',
                  
                }}
              >
                <Paginate 
                  
                  page={page as number}
            
                />
              </Paper>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
