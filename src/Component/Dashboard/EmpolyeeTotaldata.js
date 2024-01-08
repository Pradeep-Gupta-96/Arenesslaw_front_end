import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
    Button, Grid, Link, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AdminNavbar from '../Navbar/AdminNavbar';
import '../style/style.css';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const tableCSS = {
    cursor: "pointer",
    transition: "transform 0.5s ease",
    "&:hover": {
        color: "#1a237e",
        transform: "scale(0.99)",
    }
};

const Totalexceldata = () => {
    const [results, setResults] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalDataCount, setTotalDataCount] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchValue, setSearchValue] = useState('');

    const handleOnChange = (e) => {
        setSearchValue(e.target.value.toLowerCase());
    };

    const reset = () => {
        setSearchValue('');
    };


    const API = `https://recqarz.com/api/excel/exportExcelData/${id}/${JSON.parse(localStorage.getItem("username"))}`;

    const callApi = async (page) => {
        try {
            const res = await fetch(`${API}?page=${page}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });

            const result = await res.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * 20 + index + 1, // Calculate the rowIndex based on the current page and index
            }));

            setResults(adjustedResultArray);
            setTotalDataCount(parseInt(result.totalPages));

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const API2 = `https://recqarz.com/api/excel/searchingdata/${id}/${JSON.parse(localStorage.getItem("username"))}/${searchValue}`;

    const callSearchApi = async (page) => {
        try {
            const res = await fetch(`${API2}?page=${page}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });

            const result = await res.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * 20 + index + 1, // Calculate the rowIndex based on the current page and index
            }));

            setResults(adjustedResultArray);
            setTotalDataCount(parseInt(result.totalPages));

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        if (searchValue.trim() === '') {
            // Call API for regular data if search value is empty
            callApi(page);
        } else {
            // Call search API if search value is present
            callSearchApi(page);
        }
    }, [page, searchValue]);


    const clickfordeatils = (id) => {
        navigate(`/detailspage/${id}`);
    };

    return (
        <>
            <Box className="mainpage" sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box className='rightpart' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>

                        <AnimatedGridItem item xs={12}>
                            <div className='topbar'>
                                <Item sx={{ display: "flex", justifyContent: "space-between", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }}>
                                    <TextField type='Search' value={searchValue} placeholder='Customer Name' size="small" sx={{ m: 1, minWidth: 200 }} onChange={handleOnChange} />
                                    <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={reset}>Reset</Button>
                                </Item>
                            </div>
                        </AnimatedGridItem>

                        <AnimatedGridItem item xs={12}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer >
                                    {isloading ? (
                                        <div className="loading"></div>
                                    ) : (
                                        <>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>S. No.</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>CUSTOMER NAME</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>MOBILE</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>ACCOUNT</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>SMS STATUS</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>EMAIL STATUS</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>SHORT LINK</TableCell>
                                                        <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>ACTION</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {results
                                                        .map((item, index) => (
                                                            <TableRow sx={tableCSS} hover role="checkbox" tabIndex={-1} key={item._id}>
                                                                <TableCell>{item.rowIndex}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>{item.EMBONAME}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>{item["MOBILEPHONE_HOME"]}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>{item.ACCOUNT}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>{item["SMS Status"]}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>{item["EMAIL STATUS"]}</TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }}>
                                                                    <Link href={item['Short Link']} target="_blank" rel="noopener noreferrer">
                                                                        <PictureAsPdfIcon />
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Link onClick={() => { clickfordeatils(item._id) }}>
                                                                        View Details
                                                                    </Link>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>

                                        </>
                                    )}
                                </TableContainer>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={totalDataCount}
                                        page={page}
                                        onChange={(event, value) => setPage(value)}
                                        showFirstButton
                                        showLastButton

                                    />
                                </Stack>
                            </Paper>
                        </AnimatedGridItem>
                    </Grid>
                </Box>
            </Box>
        </>
    )
};

export default Totalexceldata;
