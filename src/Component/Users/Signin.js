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
import {  Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://16.16.45.44:4000/user/signin", {
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
    <ThemeProvider theme={theme}>
      <Container component="main"   >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: "center",
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': {
              m: 1,
              width: "100%",
                  height: 550,
                  maxWidth:600
            },
          }}
        >
          <Paper elevation={6} >
            <Avatar sx={{ mx: 'auto', mt: 5, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ my: 1,textAlign:"center" }}>
              Sign-in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ m: "8%"}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={visivility ? "text" : "password"}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <IconButton onClick={changeicons}>
                        {visivility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                }}
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
