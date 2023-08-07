import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom';
import {
    LinearProgress, Typography, Paper, Grid, Button, Dialog, DialogContent, DialogTitle, Slide, Table, TableRow,
    TableHead, TableBody, TableCell, TableContainer, InputLabel, MenuItem, FormControl, Select, TextField, TablePagination
} from '@mui/material';
import Dialogfordata from '../Dashboard/Dialogfordata';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import '../style/style.css'
import AdminNavbar from '../Navbar/AdminNavbar';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const UploadFileIconCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { transform: "scale(1.2)" } }
const UploadFileIconCSS1 = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { transform: "rotate(360deg)" } }
const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }
const Notice = () => {
    const [open, setOpen] = useState(false);
    const intupvalue = {
        emailformail: "",
        username: `${JSON.parse(localStorage.getItem('username'))}`
    }
    const [emailformaill, setEmailformail] = useState(intupvalue);
    const [inputsearchvalue, setInputsearchvalue] = useState('')
    const [inputsearchmail, setinputsearchmail] = useState('');
    const [inputsearchtemp, setinputsearchtemp] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [greeting, setGreeting] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [results, setResults] = useState([])
    const revData = Array.isArray(results) ? [...results].reverse() : [];


    const handleChange = (event) => {
        const { name, value } = event.target
        setEmailformail({ ...emailformaill, [name]: value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const totalexceldata = (id) => {
        navigate(`/totalexceldata/${id}`)
    }


    const API = `http://localhost:4000/excel`;
    const callapi = async (url) => {
        try {
            const responce = await fetch(url, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            })
            const results = await responce.json()
            setResults(results.message)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        callapi(API)
    }, [])




    const reloadPage = () => {
        window.location.reload(); // Reload the page
    };

    const onChange = (event) => {
        setInputsearchvalue(event.target.value)
    }
    const searchhandleChangeT = (event) => {
        setinputsearchtemp(event.target.value);
    };

    const searchhandleChangeM = (event) => {
        setinputsearchmail(event.target.value);
    };

    const resetsearchbar = () => {
        setInputsearchvalue('')
        setinputsearchtemp('')
        setinputsearchmail('')
    }

    //Greetins with time and date
    useEffect(() => {
        const getCurrentDateTime = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDateTime = date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString();

            if (date.getHours() >= 0 && date.getHours() < 12) {
                setGreeting('Good morning!');
            } else if (date.getHours() >= 12 && date.getHours() < 18) {
                setGreeting('Good afternoon!');
            } else {
                setGreeting('Good evening!');
            }

            setCurrentDateTime(formattedDateTime);
        };

        // Initial call to getCurrentDateTime
        getCurrentDateTime();

        // Update time every second using setInterval
        const intervalId = setInterval(getCurrentDateTime, 1000);

        // Cleanup function to clear the interval when component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <AnimatedGridItem item xs={10} >
                                <Typography variant="h6">{greeting}, RECQARZ!</Typography>
                                <Typography variant='subtitle2'>{currentDateTime}</Typography>
                                <Item>
                                    <Typography variant='subtitle2'>Stay informed about the current happenings!!</Typography>

                                    <Typography component="h1" variant="h5">
                                        Dashboard
                                        <br />
                                        <DashboardIcon fontSize="large" color="secondary" />
                                    </Typography>
                                </Item>
                            </AnimatedGridItem>

                            {/*================ Dialog ============== */}
                            <AnimatedGridItem item xs={2}>
                                <Item>
                                    <UploadFileIcon color="secondary" sx={UploadFileIconCSS1} onClick={handleClickOpen} /> <br />
                                    <Button variant="contained" sx={UploadFileIconCSS} color="secondary" onClick={handleClickOpen}>
                                        Bulk Upload
                                    </Button>
                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Bulk Upload File!"}</DialogTitle>
                                        <DialogContent>
                                            <Dialogfordata />
                                        </DialogContent>
                                    </Dialog>
                                </Item>
                            </AnimatedGridItem>

                            {/*================ Searchbar ============== */}
                            <AnimatedGridItem item xs={12} >
                                <Item sx={{ display: "flex", justifyContent: "space-between", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }}    >
                                    <TextField type='Search' placeholder='file name' size="small" sx={{ m: 1, minWidth: 200 }} onChange={onChange} />
                                    <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={resetsearchbar} >Reset</Button>
                                </Item>
                            </AnimatedGridItem>

                            {/*================ Table ============== */}
                            <Grid item xs={12}>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
                                        {isLoading ? (
                                            <Box sx={{ width: '100%', marginTop: '20px' }}>
                                                <LinearProgress />
                                            </Box>
                                        ) : (
                                            <>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>S. No.</TableCell>
                                                            <TableCell>File Name</TableCell>
                                                            <TableCell>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {revData
                                                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                                                            .map((item, index) => (
                                                                <TableRow
                                                                    sx={tableCSS}
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    key={item._id}
                                                                >
                                                                    <TableCell component="th" scope="row">{index + 1}  </TableCell>
                                                                    <TableCell align="left"> {item.filename}</TableCell>
                                                                    <TableCell align="left">
                                                                        <Button variant='contained' onClick={() => { totalexceldata(item._id) }} >
                                                                            Open!
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                                <TablePagination
                                                    rowsPerPageOptions={[10, 25, 100]}
                                                    component="div"
                                                    count={revData.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page - 1}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </>
                                        )}
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Notice