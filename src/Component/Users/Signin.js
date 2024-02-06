import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const theme = createTheme();

export default function Signin() {
  const Navigate = useNavigate()
  const [visivility, setVisivility] = React.useState(false)

  const changeicons = () => {
    if (visivility === false) {
      setVisivility(true)
    } else {
      setVisivility(false)
    }
  }
  const changeIcons = () => {
    if (visivility === false) {
      setVisivility(true)
    } else {
      setVisivility(false)
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("https://recqarz.com/api/user/signin", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        })
      });

      const result = await response.json();
 

      if (result.message === "Invalid credentials.") {
        toast("Invalid credentials!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        });
        return;
      }



      const { username, _id, role } = result.user;
      localStorage.setItem("username", JSON.stringify(username));
      localStorage.setItem("id", JSON.stringify(_id));
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("role", JSON.stringify(role));
      
      toast("Login Successful!", {
        position: "top-center",
        autoClose: 1000,
        type: "success"
      });

  if(result.user.role==="User"){
    Navigate('/emplyeeDashboard');
  }else{
    Navigate('/notice');
  }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <div className='login-page'>
    <Box className="login-box">
          <div>
            <h3 className="text-primary">Welcome Back !</h3>
            <p className="text-muted">Sign in to continue to portal.</p>
          </div>
          <Box component="form" onSubmit={handleSubmit} sx={{}}>
            <TextField
              id="email"
              label="Email Address"
              placeholder='Type Your Email'
              size='large'
              margin="normal" required fullWidth name="email" autoComplete="email" autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              placeholder='Type your password'
              type={visivility ? "text" : "password"} // Assuming 'visibility' is the correct variable name
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={changeIcons}>
                      {visivility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="password"
              autoComplete="current-password"
              variant="standard"
            />
            <div className='login-btn'>
            <div className="login100-form-bgbtn"></div>
            <Button type="submit" fullWidth variant="contained" >Sign In</Button>
            </div>
            <Grid container>
              <Grid item xs>
                <Typography variant='subtitle2'>
                  <RouterLink to='/ResetwithOTP'>Forgot password?</RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </div>
    </>
    
  );
}
