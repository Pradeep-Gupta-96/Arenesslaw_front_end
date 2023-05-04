import React,{useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminNavbar from '../Navbar/AdminNavbar';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Report = () => {
  const navigate=useNavigate()

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
            Report

        </Box>
    </Box>
    </>

  )

}

export default Report