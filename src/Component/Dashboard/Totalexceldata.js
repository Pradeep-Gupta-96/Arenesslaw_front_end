import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import {
    Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Grid, List, ListItem,
    ListItemText, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import Dialogresendemail from './Dialogresendemail';
import Dialogtimeline from './Dialogtimeline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AdminNavbar from '../Navbar/AdminNavbar';
import '../style/style.css'
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IconsCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", borderRadius: "50%", transform: "scale(1.2)" } }
const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }

const Totalexceldata = () => {
    const [open1, setopen1] = useState(false);
    const [open2, setopen2] = useState(false);
    const [results, setResults] = useState([])
    const [heders, setheaders] = useState([])
    const [isloading, setisLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()


    const handleClickopen1 = () => {
        setopen1(true);
    };

    const handleClickopen2 = () => {
        setopen2(true);
    };

    const handleClose1 = () => {
        setopen1(false);
    };

    const handleClose2 = () => {
        setopen2(false);
    };

    const API = `http://localhost:4000/excel/${id}`
    const callapi = async (url) => {
        const res = await fetch(url, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })
        const result = await res.json()
        setheaders(result.message)
        setResults(result.message.xlData)
        setisLoading(false)
    }

    const openPDF = (excelId, xlDataId) => {
        const PDF_URL = `http://localhost:4000/excel/pdf/${excelId}/${xlDataId}`;
        window.open(PDF_URL, '_blank');
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        callapi(API);
    }, []);


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item sx={tableCSS}>
                                <List>
                                    <ListItem>
                                        <ListItemText >File Name <br /><strong>{heders.filename}</strong> </ListItemText>
                                        <ListItemText >Created Date <br /> <strong> {new Date(heders.createdAt).getDate()}-{new Date(heders.createdAt).toLocaleString('default', { month: 'short' })}-{new Date(heders.createdAt).getFullYear()}</strong></ListItemText>
                                        <ListItemText >Created Time <br /> <strong> {new Date(heders.createdAt).getHours()}-{new Date(heders.createdAt).getMinutes()}-{new Date(heders.createdAt).getSeconds()}</strong></ListItemText>
                                        <ListItemText >Records Uploaded <br /><strong>{results.length}</strong></ListItemText>
                                        <ListItemText >Email ID <br /><strong> {heders.emailformail}</strong></ListItemText>
                                        <ListItemText >Status <br /><strong> {heders.emailformail ? "sent" : "pending"}</strong></ListItemText>
                                        <ListItemText >File Uploaded <br /><strong>----</strong></ListItemText>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid sx={{ marginLeft: "auto", justifyContent: "space-between" }}>
                            <Item >
                                <ButtonGroup>
                                    <Button variant='contained' sx={{ backgroundColor: "#00AEC6" }} onClick={handleClickopen1}>Re-Send Email</Button>
                                    <Dialog
                                        open={open1}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose1}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Resend Email"}</DialogTitle>
                                        <DialogContent>
                                            <Dialogresendemail />
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant='contained' sx={{ backgroundColor: "#24D555" }}>Re-Send SMS</Button>
                                </ButtonGroup>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    {isloading ? (
                                        <div className="loading"></div>
                                    ) :
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow  >
                                                    <TableCell><strong> S. No.</strong></TableCell>
                                                    <TableCell><strong> Applicant Name</strong> </TableCell>
                                                    <TableCell><strong>Email ID</strong></TableCell>
                                                    <TableCell><strong>Phone Number</strong></TableCell>
                                                    <TableCell><strong>Due Amount</strong></TableCell>
                                                    <TableCell><strong>PDF</strong></TableCell>
                                                    <TableCell><strong>Actions</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    results.map((item, index) => {
                                                        return (
                                                            <TableRow sx={tableCSS} hover role="checkbox" tabIndex={-1} key={item._id}>

                                                                <TableCell  >{index + 1} </TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }} >{item.FPR_NAME}</TableCell>
                                                                <TableCell >{item.E_mail} </TableCell>
                                                                <TableCell >{item.MOBILEPHONE_HOME}</TableCell>
                                                                <TableCell >{item.DPI_Amount} </TableCell>
                                                                <TableCell >
                                                                    <PictureAsPdfIcon variant="contained" onClick={() => openPDF(id, item._id)} />
                                                                </TableCell>
                                                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <Button variant='contained' sx={{ backgroundColor: "#00AEC6" }}>Re-Send Email</Button>
                                                                    <Button variant='contained' sx={{ backgroundColor: "#24D555" }}>Re-Send SMS</Button>
                                                                    <Button variant='non'><WhatsAppIcon sx={{
                                                                        color: "#24D555",
                                                                        transition: "transform 0.5s ease", "&:hover": { transform: "scale(1.2)" }
                                                                    }} /></Button>
                                                                    <Button variant='non' sx={IconsCSS}><EmailOutlinedIcon /></Button>
                                                                    <Button variant='non' sx={IconsCSS} onClick={handleClickopen2}><UpdateOutlinedIcon /></Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    }
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Dialog
                            open={open2}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose2}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <Dialogtimeline />
                            </DialogContent>
                        </Dialog>
                    </Grid>
                </Box>
            </Box>
        </>

    )

}

export default Totalexceldata 