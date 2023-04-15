import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import AdminNav from '../Navbar/AdminNav'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AdminDashboard = () => {
    const [campany, setompany] = useState('');
    const navigate = useNavigate()

    const handleChange = (event) => {
        setompany(event.target.value);
    };


    const submit = () => {
        if(campany===""){
            navigate('/admindashboard')
            toast("select company", {
                position: "top-center",
                autoClose: 1000
              })
        }else{
            localStorage.setItem("comapny", JSON.stringify(campany))
            navigate("/home")
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Typography component="h1" variant="h5" > Dashboard</Typography>
                    <Box component="form" sx={{ m: 6, height: 550 }}>
                        <Typography component="h1" variant="h6" > Select Company</Typography>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={campany}
                                label="Company"
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={"SBI Credit Cards"}>SBI Credit Cards</MenuItem>
                                <MenuItem value={"Mobikwik"}>Mobikwik</MenuItem>
                                <MenuItem value={"Vodafone"}>vodafone</MenuItem>
                            </Select>
                            <Button sx={{ mt: 50, ml: 100 }} variant="contained" color="secondary" onClick={submit} >
                                Proceed....
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AdminDashboard