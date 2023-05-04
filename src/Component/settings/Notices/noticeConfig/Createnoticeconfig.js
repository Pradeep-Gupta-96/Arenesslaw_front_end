import React, { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Avatar, Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Navbar/AdminNavbar';

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

const Createnoticeconfig = () => {
    const navigate = useNavigate()
    const [HeaderImage, setHeaderImage] = useState(null);
    const [FooterImage, setFooterImage] = useState(null);
    const [WaterMark, setWaterMark] = useState(null);
    const [inputvalue, setInputvalue] = React.useState({ LetterHeadName: "", Orientation: "", HeaderMargin: "", FooterMargin: "", PageLeftMargin: "", HeaderLeftMargin: "", WaterMarktransparency: "" });

    const handleAvatarChange1 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setHeaderImage(reader.result);
        };
    };
    const handleAvatarChange2 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFooterImage(reader.result);
        };
    };
    const handleAvatarChange3 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setWaterMark(reader.result);
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputvalue({
            ...inputvalue, [name]: value
        })
    };


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Paper elevation={3} sx={{ width: "100%", p: 3, maxWidth: "1200px", mx: "auto" }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>Letter Head Name*</Typography>
                                <TextField label="Enter" name='LetterHeadName' value={inputvalue.LetterHeadName} onChange={handleChange} variant="outlined" size="small" fullWidth />
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Select Orientation</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='Orientation'
                                        value={inputvalue.Orientation}
                                        label="Select"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Portrait"}>Portrait</MenuItem>
                                        <MenuItem value={"Landscape"}>Landscape</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}><Typography>Header</Typography></Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>Header Left Margin Space</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='HeaderMargin'
                                        value={inputvalue.HeaderMargin}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"5mm"}>5mm</MenuItem>
                                        <MenuItem value={"10mm"}>10mm</MenuItem>
                                        <MenuItem value={"15mm"}>15mm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Header Image</Typography>
                                <TextField
                                    type="file"
                                    onChange={handleAvatarChange1}
                                    inputProps={{ accept: 'image/*' }}
                                    size='small'
                                />
                                {HeaderImage && <Avatar src={HeaderImage} />}
                            </Grid>
                            <Grid item xs={12}><Typography>Footer</Typography></Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Footer Left Margin Space</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='FooterMargin'
                                        value={inputvalue.FooterMargin}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"5mm"}>5mm</MenuItem>
                                        <MenuItem value={"10mm"}>10mm</MenuItem>
                                        <MenuItem value={"15mm"}>15mm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Footer Image</Typography>
                                <TextField
                                    type="file"
                                    onChange={handleAvatarChange2}
                                    inputProps={{ accept: 'image/*' }}
                                    size='small'
                                />
                                {FooterImage && <Avatar src={FooterImage} />}
                            </Grid>
                            <Grid item xs={12}><Typography>Page Margins</Typography></Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Page Left Margin Space</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='PageLeftMargin'
                                        value={inputvalue.PageLeftMargin}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"5mm"}>5mm</MenuItem>
                                        <MenuItem value={"10mm"}>10mm</MenuItem>
                                        <MenuItem value={"15mm"}>15mm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>Header Left Margin Space</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='HeaderLeftMargin'
                                        value={inputvalue.HeaderLeftMargin}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"5mm"}>5mm</MenuItem>
                                        <MenuItem value={"10mm"}>10mm</MenuItem>
                                        <MenuItem value={"15mm"}>15mm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}><Typography>Water Mark</Typography></Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Water Mark image</Typography>
                                <TextField
                                    type="file"
                                    onChange={handleAvatarChange3}
                                    inputProps={{ accept: 'image/*' }}
                                    size='small'
                                />
                                {WaterMark && <Avatar src={WaterMark} />}
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>Water Mark transparency</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='WaterMarktransparency'
                                        value={inputvalue.WaterMarktransparency}
                                        label="Age"
                                        onChange={handleChange}
                                        size='small'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"5mm"}>5mm</MenuItem>
                                        <MenuItem value={"10mm"}>10mm</MenuItem>
                                        <MenuItem value={"15mm"}>15mm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <ButtonGroup>
                                    <Button>Reset</Button>
                                    <Button>Submit</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Box>
        </>
    )

}




export default Createnoticeconfig