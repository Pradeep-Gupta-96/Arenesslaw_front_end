import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ResetwithOTP() {
    const [visivility, setVisivility] = React.useState(false)
    const [isButtonDisabledforverifyOTP, setisButtonDisabledforverifyOTP] = React.useState(true)
    const [isButtonDisabledforupdatePassword, setisButtonDisabledforupdatePassword] = React.useState(true)
    const navigate = useNavigate()


    const changeicons = () => {
        if (visivility === false) {
            setVisivility(true)
        } else {
            setVisivility(false)
        }
    }

    const sendOTP = async (event) => {
        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget);
            console.log(data.get('email'))
            const api = "https://recqarz.com/api/user/sendopt"
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: data.get('email')
                })
            })
            const result = await response.json()
            if (result.message === "email send successfully") {
                toast("email send successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "success"
                });
                setisButtonDisabledforverifyOTP(false)
                return;
            } else {
                toast("Invalid Mail!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "error"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyOTP = async (event) => {
        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget);
            console.log(data.get('OTP'))
            const api = "https://recqarz.com/user/verifyotp"
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    enteredOTP: data.get('OTP')
                })
            })
            const result = await response.json()
            if (result.message === "Verified") {
                toast("Verified!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "success"
                });
                localStorage.setItem("otp", result.otp);
                setisButtonDisabledforupdatePassword(false)
                return;
            } else {
                toast("Invalid or expired OTP!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "error"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
   
    const otpFromLocalStorage = localStorage.getItem("otp");
    const parsedOTP = parseInt(otpFromLocalStorage);

    const updatePassword = async (event) => {
        try {
            event.preventDefault();
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const data = new FormData(event.currentTarget);
            const { email, Npassword, Cpassword } = Object.fromEntries(data.entries());
            if (!passwordRegex.test(Npassword) || !passwordRegex.test(Cpassword)) {
                toast("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.", {
                  position: "top-center",
                  autoClose: 2000,
                  type: "error"
                });
                return;
              }
            if (Npassword === Cpassword) {
                const api = "https://recqarz.com/api/user/updatepass"
                const response = await fetch(api, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email:email,
                        Cpassword:Cpassword,
                        enteredOTP:  parsedOTP
                    })
                })
                const result = await response.json()
                console.log(result)
                if (result.message === "Password update successful") {
                    toast("Password update successful!", {
                        position: "top-center",
                        autoClose: 1000,
                        type: "success"
                    });
                    navigate('/')
                    return;
                } else {
                    toast("something went wrong", {
                        position: "top-center",
                        autoClose: 1000,
                        type: "error"
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>

                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4} >
                        <Item>
                            <Box component="form" onSubmit={sendOTP} sx={{ m: 6, mx: 9 }}>
                                <Typography variant="subtitle2" align="center">Enter your registered email to receive OTP</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    size='small'
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    send OTP
                                </Button>
                            </Box>
                            <Box component="form" onSubmit={verifyOTP} sx={{ m: 6, mx: 9 }}>
                                <Typography variant="subtitle2" align="center"> Enter the OTP received on your email</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="OTP"
                                    label="enter OTP"
                                    name="OTP"
                                    autoComplete="OTP"
                                    autoFocus
                                    size='small'
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isButtonDisabledforverifyOTP}
                                >
                                    verify OTP
                                </Button>
                            </Box>

                            <Box component="form" onSubmit={updatePassword} sx={{ m: 6, mx: 9 }}>
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
                                    name="Npassword"
                                    label="new password"
                                    type={visivility ? "text" : "password"}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position='end'>
                                                <IconButton onClick={changeicons}>
                                                    {visivility ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                                    label="confirm password"
                                    type={visivility ? "text" : "password"}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position='end'>
                                                <IconButton onClick={changeicons}>
                                                    {visivility ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                                    disabled={isButtonDisabledforupdatePassword}
                                >
                                    Update Password
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Typography variant='subtitle2'>
                                            <RouterLink to='/' >Sign in</RouterLink>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                </Grid>
            </Box>
        </>
    );
}
