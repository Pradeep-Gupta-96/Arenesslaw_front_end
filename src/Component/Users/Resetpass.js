import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

export default function Resetpass() {
  const Navigate = useNavigate()

  const [visivility, setVisivility] = React.useState(false)
  const [visivility2, setVisivility2] = React.useState(false)
  const [visivility3, setVisivility3] = React.useState(false)

  const changeicons = () => {
    if (visivility === false) {
      setVisivility(true)
    } else {
      setVisivility(false)
    }
  }
  const changeicons2 = () => {
    if (visivility2 === false) {
      setVisivility2(true)
    } else {
      setVisivility2(false)
    }
  }
  const changeicons3 = () => {
    if (visivility3 === false) {
      setVisivility3(true)
    } else {
      setVisivility3(false)
    }
  }

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate('/')
    }
  }, [])

  const handleSubmit = async (event) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const N = data.get('Npassword');
    const C = data.get('Cpassword');
    const id = JSON.parse(localStorage.getItem("id"));

    try {
      // Password validation
      if (!passwordRegex.test(N) || !passwordRegex.test(C)) {
        toast("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.", {
          position: "top-center",
          autoClose: 2000,
          type: "error"
        });
        return;
      }

      if (N !== C) {
        toast("Passwords don't match.", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        });
      } else {
        const response = await fetch(`https://crm.recqarz.com/api/user/resetpass/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
          body: JSON.stringify({
            Epassword: data.get('Epassword'),
            Cpassword: data.get('Cpassword'),
          })
        });

        const result = await response.json();

        if (result.Message === "Done") {
          toast("Password update successful!", {
            position: "top-center",
            autoClose: 1000,
            type: "success"
          });
          localStorage.clear();
          Navigate('/');
        } else {
          toast("Invalid!", {
            position: "top-center",
            autoClose: 1000,
            type: "error"
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>   <Box sx={{ display: 'flex' }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
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
                <Typography component="h1" variant="h5" sx={{ mx: 25, my: 1 }}>
                  Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ m: 6, mx: 9 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Epassword"
                    label="Existing Password"
                    type={visivility ? "text" : "password"}
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton onClick={changeicons}>
                            {visivility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                    }}
                    id="Epassword"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Npassword"
                    label="New Password"
                    type={visivility2 ? "text" : "password"}
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton onClick={changeicons2}>
                            {visivility2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                    }}
                    id="Npassword"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Cpassword"
                    label="Confirm New Password"
                    type={visivility3 ? "text" : "password"}
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton onClick={changeicons3}>
                            {visivility3 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                    }}
                    id="Cpassword"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
    </>

  );
}
