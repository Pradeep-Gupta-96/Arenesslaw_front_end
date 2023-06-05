import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Grid, Paper, Typography, ButtonGroup, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import AdminNavbar from '../../../Navbar/AdminNavbar';
import SendIcon from '@mui/icons-material/Send';
import {
    EditOutlined as EditOutlinedIcon,
    RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
    Inventory2Outlined as Inventory2OutlinedIcon,
    Add as AddIcon
} from '@mui/icons-material';
import '../../../style/style.css'



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


const AnimatedGridItem = styled(Grid)`
  animation: slideIn 1s ease-in-out;

  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
const hovereffect = {
    cursor: 'pointer',
    transition: 'transform 0.5s ease',
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
        m: 5,
        width: 328,
        height: 300,

    },
    '&:hover': {
        transform: 'scale(1.05)',
        color: '#fff',
    },
}



const Openemaildetails = () => {
    const [id, setId] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })
    const handleAddEmail = () => {
        navigate("/createemails")
    }


    ///====== for pdf review 
    const onClickforViewPdf = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:4000/emailtemp", {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            const result = await response.blob()
            console.log(result.size)
            const file = new Blob([result], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(file);
            window.open(pdfUrl);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }


    //==== fetching data for updates email templates of pdf content  
    const forupdating = async () => {
        try {
            const response = await fetch("http://localhost:4000/emailtemp/data", {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            const result = await response.json()
            setId(result)
            
        } catch (error) {
            console.log(error)
        }
    }

    const onClickforUpdate = (id) => {
        navigate(`/editmailtemp/${id}`)
    }

    useEffect(() => {
        forupdating()
    }, [])
    console.log(id._id)

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container spacing={2} >
                        <AnimatedGridItem item xs={12} >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant='h4'>Email - Template</Typography>
                                <SendIcon />
                            </div>
                        </AnimatedGridItem>

                        {/* =========email template============ */}
                        <AnimatedGridItem item xs={12} sm={6}>
                            <Box
                                sx={hovereffect}
                            > <Paper elevation={3} >
                                    <Item>
                                        <Typography variant='h5'>Email templates</Typography>
                                        <Typography>0123-Notices <br />Last Updated on: 04 Apr 2023</Typography>
                                    </Item >
                                    <ButtonGroup sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px', m: 8 }}>
                                        {id.map((item) => (
                                            <Button
                                                key={item._id}
                                                variant='non'
                                                title='Edit'
                                                onClick={() => onClickforUpdate(item._id)}
                                                sx={{ color: '#3f51b5' }}
                                            >
                                                <EditOutlinedIcon />
                                            </Button>
                                        ))}
                                        <Button
                                            variant='non'
                                            title='View Notice'
                                            onClick={onClickforViewPdf}
                                            disabled={isLoading}
                                            sx={{ color: isLoading ? '#757575' : '#f50057' }}
                                        >
                                            {isLoading ? <div className="posting"></div> : <RemoveRedEyeOutlinedIcon />}
                                        </Button>
                                        <Button variant='non' sx={{ color: '#009688' }} >
                                            <Inventory2OutlinedIcon />
                                        </Button>
                                        {/* <Button 
                                            variant='contained'
                                            sx={{ height: 100, width: 100, borderRadius: '50%' }}
                                            onClick={handleAddEmail}
                                        >
                                            <AddIcon />
                                            Add New
                                        </Button> */}
                                    </ButtonGroup>
                                </Paper>
                            </Box>
                        </AnimatedGridItem>

                        {/* email scripte */}
                        <AnimatedGridItem item xs={12} sm={6}>
                            <Box
                                sx={hovereffect}
                            > <Paper elevation={3} >
                                    <Item>
                                        <Typography variant='h5'>Email Script</Typography>
                                        <Typography>0123-Notices <br />Last Updated on: 04 Apr 2023</Typography>
                                    </Item>
                                    <ButtonGroup sx={{ backgroundColor: '#f0f0f0', borderRadius: '5px', m: 8 }}>
                                        {id.map((item) => (
                                            <Button
                                                key={item._id}
                                                variant='non'
                                                title='Edit'
                                                onClick={() => onClickforUpdate(item._id)}
                                                sx={{ color: '#3f51b5' }}
                                            >
                                                <EditOutlinedIcon />
                                            </Button>
                                        ))}
                                        <Button
                                            variant='non'
                                            title='View Notice'
                                            onClick={onClickforViewPdf}
                                            disabled={isLoading}
                                            sx={{ color: isLoading ? '#757575' : '#f50057' }}
                                        >
                                            {isLoading ? <div className="posting"></div> : <RemoveRedEyeOutlinedIcon />}
                                        </Button>
                                        <Button variant='non' sx={{ color: '#009688' }} >
                                            <Inventory2OutlinedIcon />
                                        </Button>
                                        {/* <Button
                                            variant='contained'
                                            sx={{ height: 100, width: 100, borderRadius: '50%' }}
                                            onClick={handleAddEmail}
                                        >
                                            <AddIcon />
                                            Add New
                                        </Button> */}
                                    </ButtonGroup>
                                </Paper>
                            </Box>
                        </AnimatedGridItem>
                      
                    </Grid>
                </Box>
            </Box>
        </>


    )

}



export default Openemaildetails