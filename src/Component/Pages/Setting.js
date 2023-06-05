import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import AdminNavbar from '../Navbar/AdminNavbar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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


const Iconscss = styled('div')(({ theme }) => ({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    boxShadow: "0 0 0 10px rgba(0, 0, 0, 0.1)",
    background: "rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s ease",
    "&:hover": {
        color: "#1a237e",
        transform: "rotate(720deg)",
        borderRight: "5px solid #f44336",
        borderLeft: "5px solid #4caf50",
    }
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Setting = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })

    const template = () => {
        navigate("/openemaildetails")
    }
    const Noticetemp = () => {
        navigate('/opendetails')
    }
    const Config = () => {
        navigate('/openconfig')
    }
    const NoticeConfig = () => {
        navigate('/opennoticeconfig ')
    }
    const AuthNotice = () => {
        navigate('/opendetailAuth ')
    }
    const AuthMail = () => {
        navigate('/openemailauth ')
    }
    const ListItemCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(1.2)" } }
    const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <AnimatedGridItem>
                        <Item sx={tableCSS} >
                            <Typography variant='h4'> Configurations</Typography>
                        </Item>
                    </AnimatedGridItem>
                    <br />
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={0} sx={tableCSS}
                    >
                        <AnimatedGridItem item xs={12} sm={6} md={3}>
                            <Item sx={{ height: "640px" }}>
                                <List >
                                    <ListItem >
                                        <ListItemText>
                                            <Typography variant='subtitle1'>
                                                <Iconscss><SettingsOutlinedIcon fontSize='large' /></Iconscss>
                                                <br /><br /><strong>Notices</strong>
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Letter Head" onClick={NoticeConfig} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Signatory authority" onClick={AuthNotice} />
                                    </ListItem>
                                </List>
                            </Item>
                        </AnimatedGridItem>
                        <AnimatedGridItem item xs={12} sm={6} md={3}>
                            <Item sx={{ height: "640px" }}>
                                <List >
                                    <ListItem >
                                        <ListItemText>
                                            <Typography variant='subtitle1'>
                                                <Iconscss><MarkEmailReadOutlinedIcon fontSize='large' /></Iconscss>
                                                <br /><br /><strong>Email</strong>
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Email id Config " onClick={Config} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Email template" onClick={template} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Signatory authority" onClick={AuthMail} />
                                    </ListItem>
                                </List>
                            </Item>
                        </AnimatedGridItem>
                        <AnimatedGridItem item xs={12} sm={6} md={3}>
                            <Item sx={{ height: "640px" }}>
                                <List>
                                    <ListItem >
                                        <ListItemText>
                                            <Typography variant='subtitle1'>
                                                <Iconscss><BusinessOutlinedIcon fontSize='large' /></Iconscss>
                                                <br /><br /><strong>Company</strong>
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Add new company" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="View Company" />
                                    </ListItem>
                                </List>
                            </Item>
                        </AnimatedGridItem>
                        <AnimatedGridItem item xs={12} sm={6} md={3}>
                            <Item sx={{ height: "640px" }}>
                                <List>
                                    <ListItem >
                                        <ListItemText>
                                            <Typography variant='subtitle1'>
                                                <Iconscss><RocketLaunchOutlinedIcon fontSize='large' /></Iconscss>
                                                <br /><br /><strong>Additional Settings</strong>
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={ListItemCSS} primary="Role management" />
                                    </ListItem>
                                </List>
                            </Item>
                        </AnimatedGridItem>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Setting