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
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminNavbar from '../Navbar/AdminNavbar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const theme = createTheme();


export default function Signup() {
  const Navigate = useNavigate()
  const [visivility, setVisivility] = React.useState(false)
  const [Role, setRole] = React.useState('');

  React.useEffect(() => {
      if (!localStorage.getItem('token')) {
        Navigate('/')
      }
  })

  const changeicons = () => {
    if (visivility === false) {
      setVisivility(true)
    } else {
      setVisivility(false)
    }
  }

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // email and password validation
    const emailregex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passworderegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    try {
      if (!emailregex.test(data.get('email'))) {
        toast("please enter the valid email!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        })
        return
      } else if (!passworderegex.test(data.get('password'))) {
        toast("Password must contain 8 charecter at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:", {
          position: "top-center",
          autoClose: 2000,
          type: "error"
        })
        return
      }
      // post data for registration
      const res = await fetch("http://localhost:4000/user/signup", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username: data.get('username'),
          email: data.get('email'),
          "role": Role,
          password: data.get('password'),
        })
      })
      const result = await res.json()
      console.log(!result.Token)
      if (!result.Token) {
        toast("invalid credential!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        })
      }
      if (result.Token) {
        toast("Registeration Successfull !", {
          position: "top-center",
          autoClose: 1000,
          type: "success"
        })
      }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
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
                  Sign-Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ m: 6, mx: 9 }}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    autoFocus
                  />
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" >Employment type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Role}
                      label="Employment type"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                  </FormControl>
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
                    Register
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
