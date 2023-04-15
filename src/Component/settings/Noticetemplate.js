import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Grid, Paper, Typography } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';

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

const Noticetemplate = () => {
    const navigate = useNavigate()

    const noticetemp = () => {
        navigate('/createnotice')
    }


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
                    <Grid>
                        <Item >
                            <Typography variant='h4'> Notice - Template</Typography>
                        </Item>
                    </Grid>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: "center",
                            mt: "20%",
                            cursor: "pointer",
                            '& > :not(style)': {
                                m: 1,
                                width: 128,
                                height: 128,
                            },
                        }}
                    >
                        <Item elevation={3} sx={{ backgroundColor: "#BFF8FC" }} >
                            <FeedIcon sx={{ m: 2, fontSize: 30 }} />
                            <Typography variant='h6'>Open</Typography>
                        </Item>
                        <Item elevation={3} sx={{ backgroundColor: "#FFF1D6" }} onClick={noticetemp} >
                            <AddIcon sx={{ m: 2, fontSize: 30 }} />
                            <Typography variant='h6'>Add New</Typography>
                        </Item>
                    </Box>

                </Box>
            </Box>
        </>


    )

}

export default Noticetemplate