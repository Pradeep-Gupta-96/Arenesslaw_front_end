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
import { useNavigate } from 'react-router-dom';
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
      const res = await fetch("http://localhost:4000/user/signin", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        })
      })
      const result = await res.json()
      console.log(result.user.role)
      if (result.message === "invalid") {
        toast("invalid credential!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        })
      } else if (result.user.role === "Admin") {
        localStorage.setItem("username", JSON.stringify(result.user.username))
        localStorage.setItem("id", JSON.stringify(result.user._id))
        localStorage.setItem("token", JSON.stringify(result.Token))
        localStorage.setItem("role", JSON.stringify(result.user.role))
        toast("Login Successfull !", {
          position: "top-center",
          autoClose: 1000,
          type: "success"
        })
        Navigate('/admindashboard')
      } else if (result.user.role === "User") {
        localStorage.setItem("username", JSON.stringify(result.user.username))
        localStorage.setItem("id", JSON.stringify(result.user._id))
        localStorage.setItem("token", JSON.stringify(result.Token))
        localStorage.setItem("role", JSON.stringify(result.user.role))
        toast("Login Successfull !", {
          position: "top-center",
          autoClose: 1000,
          type: "success"
        })
        Navigate('/admindashboard')
      }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"  >
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
              width: 600,
              height: 550,
            },
          }}
        >
          <Paper elevation={6} >
            <Avatar sx={{ mx: 'auto', mt: 5, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mx: 32, my: 1 }}>
              Sign-in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ m: 6, mx: 9 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
              <Grid container>
                <Grid item xs>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
