import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom';
import {
    LinearProgress, Paper, Grid, Button, Slide, Table, TableRow,
    TableHead, TableBody, TableCell, TableContainer, TextField, TablePagination, Link
} from '@mui/material';
import '../style/style.css'
import AdminNavbar from '../Navbar/AdminNavbar';

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



const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }
const EmplyeeDashboard = () => {
    const [open, setOpen] = useState(false);
    const intupvalue = {
        emailformail: "",
        username: `${JSON.parse(localStorage.getItem('username'))}`
    }
    const [inputsearchvalue, setInputsearchvalue] = useState('')
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [greeting, setGreeting] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [results, setResults] = useState([])
    const revData = Array.isArray(results) ? [...results].reverse() : [];


    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const EmpolyeeTotaldata = (id) => {
        navigate(`/empolyeeTotaldata/${id}`)
    }


    const API = `http://16.16.45.44:4000/excel`;
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


    const onChange = (event) => {
        setInputsearchvalue(event.target.value)
    }

    const resetsearchbar = () => {
        setInputsearchvalue('')
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
                                                            <TableCell>Date</TableCell>
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
                                                                    <TableCell align="left">
                                                                        <Button variant='contained' onClick={() => { EmpolyeeTotaldata(item._id) }} >
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


export default EmplyeeDashboard