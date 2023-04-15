import React,{useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Notice = () => {
const navigate=useNavigate()
    
useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/')
    }
}, [])

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    Notice

                </Box>
            </Box>
        </>


    )

}

export default Notice