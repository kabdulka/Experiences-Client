
import './App.scss'
import { Container } from '@mui/material';

// import { StyledAppBar, imgStyle, headingStyle } from './styles';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/auth" element={ <Auth /> }/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
