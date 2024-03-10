import { useState, useEffect } from "react";
import { StyledAppBar, headingStyle, imgStyle, brandContainer, StyledToolBar, profile, userName } from "./styles";
import { Avatar, Button, Toolbar, Typography, useTheme } from "@mui/material";
import experiences_text from "../../assets/images/experiences-Text.png";
import experiences_logo from "../../assets/images/experiences-logo.png";
import { Link } from 'react-router-dom';
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import { useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const Navbar: React.FC = () => {

    // const user = null;
    const theme = useTheme();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    console.log(user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = user?.token;

    // useEffect(() => {

    //     if (token) {
    //         const {exp} = jwtDecode(token);

    //         if (exp * 1000 < new Date().getTime()) {
    //             handleLogout();
    //         }
    //     }

    //     setUser(JSON.parse(localStorage.getItem("profile")));
    // }, [location])

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                const { exp } = jwtDecode(token);
                const expirationTime = exp * 1000 - new Date().getTime();
    
                if (expirationTime <= 0) {
                    // Token has expired, log out the user
                    handleLogout();
                } else {
                    // Set a timer to check for expiration when the token is close to expiring
                    setTimeout(checkTokenExpiration, expirationTime);
                    // setTimeout(() => {
                    //     console.log(expirationTime);
                    //     checkTokenExpiration();
                    // }, expirationTime)
                }
            }
            console.log("We're here again")
        };
    
        checkTokenExpiration();
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [token, location]);

    const handleLogout = () => {
        dispatch(logout(null));
        setUser(null);
        navigate("/auth");
        console.log(location.pathname)
    }

  return (
  
    <StyledAppBar position='static' color="inherit" >
        {/* <div style={brandContainer}> */}

            {/* <Typography sx={headingStyle} component={Link} to="/" variant='h2' align='center'> Experiences </Typography> */}
            <Link to="/" style={brandContainer}> 
                <img src={experiences_text} alt="Experiences" height="45px"/>
                <img style={imgStyle}src={experiences_logo} alt="icon" height="40px" />
            </Link>

        {/* </div> */}

        <StyledToolBar>
            {
                user ? (
                    // <div style={profile}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "400px",
                        alignItems: "center",
                        // flexDirection: theme.breakpoints.up("md") ? 'column' : 'row',
                        // [theme.breakpoints.down("md")]: {
                        //     flexDirection: 'column',
                        //     // width: 'auto',
                        //     // marginTop: 20,
                        //     border: "yellow solid 1px",
                        //     justifyContent: 'center',
                        // }
                    }}>
                        <Avatar sx={{
                            color: theme =>  theme.palette.getContrastText(deepPurple[500]),
                                backgroundColor: deepPurple[500],
                            }} src={user?.picture} 
                            alt={user?.name || user?.result?.name }
                        >
                            {
                                user?.name || user.result.name?.charAt(0)
                            }
                        </Avatar>
                        <Typography sx={userName} variant="h6"> 
                            { user?.name || user?.result.name} 
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button 
                            component={Link}
                            to="/auth"
                            onClick={()=>navigate("/auth")}
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </div>
                )
            }
        </StyledToolBar>
        
    </StyledAppBar>
    
  )
}

export default Navbar
