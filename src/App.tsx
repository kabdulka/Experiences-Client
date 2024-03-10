
import './App.scss'
import { Container } from '@mui/material';

// import { StyledAppBar, imgStyle, headingStyle } from './styles';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import Auth from './components/Auth/Auth';

const App: React.FC = () => {

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={ <Navigate to="/posts" /> }/>
          <Route path='/posts' element= {<Home/>} />
          <Route path='/posts/search' element= {<Home/>} />
          <Route path='/posts/:id' element= {<PostDetails/>} />
          <Route path="/auth" element={ !user ? <Auth/> : <Navigate to="/"/> }/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
