import { Avatar, Button, Typography, Paper, Container, Grid, Icon, } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { paper, avatarStyle, form, submit, googleButton } from "./styles";
import { GoogleLogin } from "@react-oauth/google";
import Input from "./Input";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { setAuthData } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../api";

type formDataType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Auth = () => {

    const user = useAppSelector((state) => state.authSlice.authData);
    // const [user, _] = useState(JSON.parse(localStorage.getItem("profile")));

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSignup, setIsSignup] = useState<boolean>(false)
    const [formData, setFormData] = useState<formDataType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        // console.log("User in AUTH", user);
        if (user) navigate("/");
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        if (isSignup) {
            // dispatch signup
            dispatch(signUp({formData}));
            // navigate("/");
        } else {
            dispatch(signIn({formData}));
            // dispatch signin
            // navigate("/");
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        setFormData({ ...formData,  [name]: event.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev)
        // reset show password
        setShowPassword(false)
    }

    // interface JwtPayload {
    //     sub: string;
    //     email: string;
    //     token: string
    //     // Add other properties as needed
    //   }

    const onSuccess = async (credentialResponse) => {
        // console.log(credentialResponse)
        const { credential, clientId, select_by } = credentialResponse;
        const decodedToken = jwtDecode<JwtPayload>(credential);
        // const userId = decodedToken?.sub;
        // const userEmail = decodedToken?.email;
        // const token = decodedToken?.token;
        // store decoded Token inside our redux store
        // console.log(decodedToken)
        // console.log(userEmail)
        // console.log(userId)
        // console.log(token)

        try {
            dispatch(setAuthData(decodedToken));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const onError = () => {
        console.log("login failed");
    }

    return (
        <Container component="main" maxWidth='xs'>

            <Paper elevation={3} sx={paper}>
                <Avatar sx={avatarStyle}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {
                        isSignup ? "Sign Up" : "Sign In"
                    }
                </Typography>
                <form style={form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleInputChange={(event) => {handleInputChange(event)}} type="name" autoFocus half/>  
                                    <Input name="lastName" label="Last Name" handleInputChange ={(event) => handleInputChange(event)} type="name" autoFocus  half/> 
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleInputChange={(event) => handleInputChange(event)} type="email"/>
                        <Input name="password" label="password" handleInputChange={(event) => handleInputChange(event)} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/> 
                        {
                            isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleInputChange={(event) => handleInputChange(event)}  />
                        }
                        
                    </Grid>
                    <GoogleLogin 
                        // render={renderProps => (
                        //     <Button sx={googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"> Google Sign In </Button>
                        //     ) } 
                        // how button will be shown
                        containerProps={{
                            style: {
                                width: "100%",
                                marginTop: "16px",
                                
                              },
                        }}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                    <Button sx={submit} type="submit" fullWidth variant="contained" color="primary"> { isSignup ? "Sign Up": "Sign In" } </Button>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item> 
                            <Button onClick={switchMode}> { isSignup ? "Already have an account? Sign In" : " Don't have an account?" } </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
