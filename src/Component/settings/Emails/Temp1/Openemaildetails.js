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
import { toast } from 'react-toastify';



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
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [hasScript, setHasScript] = useState(false);
    const [hasTemp, setHasTemp] = useState(false);
    const [Scriptid, setScriptid] = useState();
    const [Tempid, setTempid] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })
    const handleAddEmail = () => {
        navigate("/createemails")
    }
    const handleAddScript = () => {
        navigate("/createscript")
    }

    ///====== for pdf review of temp
    const onClickforViewPdf = async () => {
        try {
            setIsLoading(true);
            const url = `http://localhost:4000/emailtemp/viewpdf/${Tempid}`
            const options = {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.blob()
            const file = new Blob([result], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(file);
            window.open(pdfUrl);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    // ======== for pdf review of script
    const onclickforViewscriptpdf = async () => {
        try {
            setIsLoading1(true);
            const url = `http://localhost:4000/emailscript/pdfview/${Scriptid}`
            const token = JSON.parse(localStorage.getItem("token"))
            const options = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.blob()
            const file = new Blob([result], { type: 'application/pdf' })
            const pdfurl = URL.createObjectURL(file)
            window.open(pdfurl)
            setIsLoading1(false);
        } catch (error) {
            setIsLoading1(false);
            console.log(error)
        }
    }

    //==== fetching data for updates email templates of pdf content  
    const forupdating = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const username = JSON.parse(localStorage.getItem("username"))
            const url = `http://localhost:4000/emailtemp/data?username=${username}`
            const options = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            setHasTemp(!!result._id)
            setTempid(result._id)

        } catch (error) {
            console.log(error)
        }
    }

    //==== fetching data for updates email scripte 
    const forUpdatingScript = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const username = JSON.parse(localStorage.getItem("username"));

            const url = `http://localhost:4000/emailscript/getscript?username=${username}`;
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await fetch(url, options);
            const result = await response.json();

            setHasScript(!!result._id);
            setScriptid(result._id)
        } catch (error) {
            console.log(error);
        }
    };

    //for delet temp
    const onClickfordelettem = async () => {
        try {
            const url = `http://localhost:4000/emailtemp/deletpdf/${Tempid}`
            const token = JSON.parse(localStorage.getItem("token"));
            const option = {
                method: "delete",
                headers: {
                    authorization: `bearer ${token}`
                }
            }
            const response = await fetch(url, option)
            const result = await response.json()
            if (result.message === "succcess") {
                toast('Script Created Successfully', {
                    position: 'top-center',
                    autoClose: 1000,
                    type: 'success',
                });
                forupdating()
            }
        } catch (error) {
            console.log(error)
        }
    }
    //for delet script
    const onClickfordelescript = async () => {
        try {
            const url = `http://localhost:4000/emailscript/deletescript/${Scriptid}`
            const token = JSON.parse(localStorage.getItem("token"));
            const option = {
                method: "delete",
                headers: {
                    authorization: `bearer ${token}`
                }
            }
            const response = await fetch(url, option)
            const result = await response.json()
            if (result.message === "succcess") {
                toast('Script Created Successfully', {
                    position: 'top-center',
                    autoClose: 1000,
                    type: 'success',
                });
                forUpdatingScript()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickfortempupdate = () => {
        navigate(`/editmailtemp/${Tempid}`)
    }

    const onClickforScriptupdate = () => {
        navigate(`/editmailscript/${Scriptid}`)
    }

    useEffect(() => {
        forupdating()
        forUpdatingScript()
    }, [])


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
                                        {hasTemp ? (
                                            <>
                                                <Button
                                                    variant='non'
                                                    title='Edit'
                                                    onClick={() => onClickfortempupdate()}
                                                    sx={{ color: '#3f51b5' }}
                                                >
                                                    <EditOutlinedIcon />
                                                </Button>
                                                <Button
                                                    variant='non'
                                                    title='View Notice'
                                                    onClick={onClickforViewPdf}
                                                    disabled={isLoading}
                                                    sx={{ color: '#009688' }}
                                                >
                                                    {isLoading ? <div className="posting"></div> : <RemoveRedEyeOutlinedIcon />}
                                                </Button>
                                                <Button
                                                    variant='non'
                                                    sx={{ color: '#f50057' }}
                                                    title='delete'
                                                    onClick={onClickfordelettem}
                                                >
                                                    <Inventory2OutlinedIcon />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant='contained'
                                                    sx={{ height: 100, width: 100, borderRadius: '50%' }}
                                                    onClick={handleAddEmail}
                                                >
                                                    <AddIcon />
                                                    Add New
                                                </Button>
                                            </>
                                        )}


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
                                        {hasScript ? (
                                            <>
                                                <Button
                                                    variant='non'
                                                    title='Edit'
                                                    sx={{ color: '#3f51b5' }}
                                                    onClick={() => onClickforScriptupdate()}
                                                >
                                                    <EditOutlinedIcon />
                                                </Button>
                                                <Button
                                                    variant='non'
                                                    title='View Notice'
                                                    onClick={onclickforViewscriptpdf}
                                                    disabled={isLoading1}
                                                    sx={{ color: '#009688' }}
                                                >
                                                    {isLoading1 ? <div className="posting"></div> : <RemoveRedEyeOutlinedIcon />}
                                                </Button>
                                                <Button
                                                    variant='non'
                                                    sx={{ color: '#f50057' }}
                                                    title='delete'
                                                    onClick={onClickfordelescript}
                                                >
                                                    <Inventory2OutlinedIcon />
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant='contained'
                                                sx={{ height: 100, width: 100, borderRadius: '50%' }}
                                                onClick={handleAddScript}
                                            >
                                                <AddIcon />
                                                Add New
                                            </Button>
                                        )}
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