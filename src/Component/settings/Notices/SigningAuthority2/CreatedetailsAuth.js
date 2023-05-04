import React, { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Avatar, Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Navbar/AdminNavbar';
import '../../CKeditor.css'


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CreatedetailsAuth = () => {
    const navigate = useNavigate()
    const [avatarImage, setAvatarImage] = useState(null);
    const [age, setAge] = React.useState('');

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatarImage(reader.result);
        };
    };
    console.log(avatarImage)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const ListItemCSS = {
        display: 'block', cursor: "pointer",
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        boxShadow: "0 0 0 10px #eceff1",
        background: "#eceff1"
    }
    const styles = {
        fileInput: {
            display: 'none', // hide the default input element
        },
        label: {
            display: 'block',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            boxShadow: '0 0 0 10px #eceff1',
            cursor: 'pointer',
            overflow: 'hidden',
        },
        labelText: {
            display: 'block',
            textAlign: 'center',
            marginTop: '45px',
            fontSize: '14px',
            color: '#777',
        },
    };

    //preparing notice
    // const exportHtml = async () => {
    //     emailEditorRef.current.editor.exportHtml((data) => {
    //         const { html } = data;
    //         const Obj = {
    //             html: html
    //         }
    //         setGethtml(Obj)
    //     });

    //     try {
    //         const res = await fetch("http://localhost:4000/notice/savehtml", {
    //             method: "post",
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(gethtml)
    //         })
    //         const result = await res.json()
    //         if (result.message === "Saved") {
    //             toast("Saved!", {
    //                 position: "top-center",
    //                 autoClose: 1000,
    //                 type: "success"
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12}> Signing Authority Name*</Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Enter" variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={6} >
                                <Typography>Signing Authority User</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value={"Sagar Aggarwal"}>Sagar Aggarwal</MenuItem>
                                        <MenuItem value={"Tanya Aggarwal"}>Tanya Aggarwal</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={6} >
                                <Typography>Signing Authority for*</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value={"Signing Authority 1"}>Signing Authority 1</MenuItem>
                                        <MenuItem value={"Signing Authority 2"}>Signing Authority 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>Digital Signature Image</Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                type="file"
                                onChange={handleAvatarChange}
                                inputProps={{ accept: 'image/*' }}
                                size='small'
                            />
                            {avatarImage && <Avatar src={avatarImage} />}
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <ButtonGroup>
                                <Button>Reset</Button>
                                <Button>Submit</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default CreatedetailsAuth