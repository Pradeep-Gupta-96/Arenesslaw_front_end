import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom';
import {
    LinearProgress, Typography, Paper, Grid, Button, Dialog, DialogContent, DialogTitle, Slide, Table, TableRow,
    TableHead, TableBody, TableCell, TableContainer, TextField,  FormControl, InputLabel, Select, MenuItem, Stack, Pagination
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
    const [noticetype, setNoticetype] = useState('')
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [greeting, setGreeting] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [dateSearchValue, setDateSearchValue] = useState('');
    const [totalDataCount, setTotalDataCount] = useState(null);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([])
    const revData = Array.isArray(results) ? [...results].reverse() : [];

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangefornoticetype = (event) => {
        setNoticetype(event.target.value);
    };

    const onChangeDate = (event) => {
        setDateSearchValue(event.target.value);
    };

    const resetsearchbar = () => {
        setDateSearchValue('')
        setNoticetype('')
    }

    const totalexceldata = (id) => {
        navigate(`/totalexceldata/${id}`)
    }



    const API = `http://16.16.45.44:4000/excel/getAllexceldata`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${JSON.parse(localStorage.getItem("token"))}`);
    const requestOptions = {
        method: 'get',
        headers: myHeaders,
    };

    const fetchData = async (page) => {
        try {
            const response = await fetch(`${API}?page=${page}`, requestOptions)
           
            const result = await response.json()
            
            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * 20 + index + 1, // Calculate the rowIndex based on the current page and index
            }));

            setResults(adjustedResultArray)
            setTotalDataCount(parseInt(result.pageInfo.totalPages));
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        fetchData(page);

    }, [page]);


    const filteredData = revData.filter((item) => {
        const inputSearch = dateSearchValue.toLowerCase();
        const inputsearchtempp = noticetype.toLowerCase();

        const formattedDateTime = new Date(item.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).toLowerCase();

        const outputsearch = formattedDateTime;
        const outputsearchtemp = item.NoticeType.toLowerCase();

        return (
            outputsearch.startsWith(inputSearch) &&
            outputsearchtemp.startsWith(inputsearchtempp)
        );
    });


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
                                <Item sx={{ mt: "20px", py: "12px", px: "15px", textAlign: "left" }}>


                                    <Typography component="h1" variant="h5">
                                        <DashboardIcon sx={{ float: "left" }} fontSize="large" color="secondary" />
                                        <span>
                                            Dashboard
                                        </span>

                                    </Typography>
                                    <Typography variant='subtitle2'>Stay informed about the current happenings!!</Typography>
                                </Item>
                            </AnimatedGridItem>

                            {/* ================ Dialog ============== */}
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
                                    <TextField type='Search' placeholder='Search by Date' size="small" sx={{ m: 1, minWidth: 200 }} defaultValue={dateSearchValue} onChange={onChangeDate} />
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Select Notice type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={noticetype}
                                            label="Select Notice type"
                                            onChange={handleChangefornoticetype}
                                        >
                                            <MenuItem value=''><em>none</em></MenuItem>
                                            <MenuItem value={"QLD"}> QLD</MenuItem>
                                            <MenuItem value={"Demand legal Notice"}> Demand legal Notice</MenuItem>
                                            <MenuItem value={"Execution Notice"}> Execution Notice</MenuItem>
                                            <MenuItem value={"Bilingual Notice Hindi"}> Bilingual Notice Hindi</MenuItem>
                                            <MenuItem value={"Bilingual Notice English"}>Bilingual Notice English</MenuItem>
                                            <MenuItem value={"Bilingual Notice Punjabi"}>Bilingual Notice Punjabi</MenuItem>
                                            <MenuItem value={"Bilingual Notice Bangali"}>Bilingual Notice Bangali</MenuItem>
                                            <MenuItem value={"Bilingual Notice Marathi"}>Bilingual Notice Marathi</MenuItem>
                                            <MenuItem value={"Bilingual Notice Kannad"}>Bilingual Notice Kannad</MenuItem>
                                            <MenuItem value={"Bilingual Notice Telugu"}>Bilingual Notice Telugu</MenuItem>
                                            <MenuItem value={"Bilingual Notice Malyaalam"}>Bilingual Notice Malyaalam</MenuItem>
                                            <MenuItem value={"Bilingual Notice Odia"}>Bilingual Notice Odia</MenuItem>
                                            <MenuItem value={"Physical conciliation"}> Physical conciliation</MenuItem>
                                            <MenuItem value={"E-Conciliation Bilingual"}> E-Conciliation Bilingual</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                                            <TableCell>Date</TableCell>
                                                            <TableCell>Notice Type</TableCell>
                                                            <TableCell>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {filteredData
                                                            .map((item, index) => (
                                                                <TableRow
                                                                    sx={tableCSS}
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    key={item._id}
                                                                >
                                                                    <TableCell component="th" scope="row">{item.rowIndex}  </TableCell>
                                                                    <TableCell>
                                                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            year: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            second: 'numeric'
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell component="th" scope="row" >{item.NoticeType}</TableCell>
                                                                    <TableCell align="left">
                                                                        <Button variant='contained' onClick={() => { totalexceldata(item._id) }} >
                                                                            Open!
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                                <Stack spacing={2}>
                                                    <Pagination
                                                        count={totalDataCount}
                                                        page={page}
                                                        onChange={(event, value) => setPage(value)}
                                                        showFirstButton
                                                        showLastButton
                                                    />
                                                </Stack>
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