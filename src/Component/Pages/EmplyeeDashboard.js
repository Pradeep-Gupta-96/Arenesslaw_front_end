import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom';
import {
    LinearProgress, Paper, Grid, Button, Table, TableRow,
    TableHead, TableBody, TableCell, TableContainer, TextField, MenuItem, InputLabel, Select, FormControl, Stack, Pagination
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

    const [noticetype, setNoticetype] = useState('')
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const [dateSearchValue, setDateSearchValue] = useState('');
    const [pageconunt, setPageconunt] = useState(null);
    const [totalDataCount, setTotalDataCount] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDtae] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([])
    const revData = Array.isArray(results) ? [...results].reverse() : [];


    const onChangeDate = (event) => {
        setDateSearchValue(event.target.value);
    };
    const onChangestartDate = (event) => {
        setStartDate(event.target.value);
    };
    const onChangeendDate = (event) => {
        setEndDtae(event.target.value);
    };


    const EmpolyeeTotaldata = (id) => {
        navigate(`/empolyeeTotaldata/${id}`)
    }


    const handleChangefornoticetype = (event) => {
        setNoticetype(event.target.value);
    };

    const API1 = `http://localhost:4000/api/excel/getAllexceldata`;
    const API2 = `http://localhost:4000/api/excel/getFilteredExcelData`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${JSON.parse(localStorage.getItem("token"))}`);
    const requestOptions = {
        method: 'get',
        headers: myHeaders,
    };

    const fetchData1 = async (page) => {
        try {
            const response = await fetch(`${API1}?page=${page}`, requestOptions)

            const result = await response.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * 20 + index + 1, // Calculate the rowIndex based on the current page and index
            }));
            setResults(adjustedResultArray)
            setPageconunt(parseInt(result.pageInfo.totalPages));
            setTotalDataCount(parseInt(result.pageInfo.totalItems));
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const fetchDataWithFilters = async () => {
        // Collect filter values, including createdAt
        const filters = {
            NoticeType: noticetype,
            startDate: startDate,
            endDate: endDate,
            createdAt: dateSearchValue, // For filtering by a specific createdAt date
        };

        // Construct the query string from filters
        const queryString = Object.entries(filters)
            .filter(([_, value]) => value) // Exclude empty values
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        try {
            const response = await fetch(`${API2}?page=${page}&${queryString}`, requestOptions);
            const result = await response.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * 20 + index + 1, // Calculate the rowIndex based on the current page and index
            }));
            setResults(adjustedResultArray)
            setPageconunt(parseInt(result.pageInfo.totalPages));
            setTotalDataCount(parseInt(result.pageInfo.totalItems));
            setIsLoading(false);
        } catch (error) {
            console.error("Fetching data failed:", error);
            setIsLoading(false);
        }
    };


    const clickforSearch = () => {
        fetchDataWithFilters()
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        fetchData1(page);

    }, [page]);


    const resetsearchbar = () => {
        setDateSearchValue('')
        setNoticetype('')
        setStartDate('');
        setEndDtae('')
    };
  


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
                                <div className='topbar'>
                                    <Item sx={{ display: "flex", justifyContent: "space-between", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }}    >
                                    Upload Date
                                        <TextField type='date' placeholder='Search by Date' size="small" sx={{ m: 1, minWidth: 200 }} value={dateSearchValue} onChange={onChangeDate} />

                                        Execution Date
                                        <TextField type='date' placeholder='startDate' size="small" sx={{ m: 1, minWidth: 200 }} value={startDate} onChange={onChangestartDate} />
                                        <TextField type='date' placeholder='endDate' size="small" sx={{ m: 1, minWidth: 200 }} value={endDate} onChange={onChangeendDate} />
                                      
                                       
                                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                            <InputLabel id="demo-simple-select-label">Select Notice type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={noticetype}
                                                label="Select Notice type"
                                                onChange={handleChangefornoticetype}
                                            >
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
                                                <MenuItem value={"E-Conciliation"}> E-Conciliation</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={clickforSearch} >Search</Button>
                                        <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={resetsearchbar} >Reset</Button>
                                    </Item>
                                </div>
                            </AnimatedGridItem>

                            {/*================ Table ============== */}
                            <Grid item xs={12}>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer >
                                        {isLoading ? (
                                            <Box sx={{ width: '100%', marginTop: '20px' }}>
                                                <LinearProgress />
                                            </Box>
                                        ) : (
                                            <>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>Date</TableCell>
                                                            <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>Notice Type</TableCell>
                                                            <TableCell sx={{ background: "#1976d2", color: "#fff", padding: "8px 10px" }}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {revData
                                                            .map((item, index) => (
                                                                <TableRow
                                                                    sx={tableCSS}
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    key={item._id}
                                                                >
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
                                                                        <Button variant='contained' onClick={() => { EmpolyeeTotaldata(item._id) }} >
                                                                            Open!
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                                <Stack spacing={2}>
                                                    <Pagination
                                                        count={pageconunt}
                                                        page={page}
                                                        onChange={(event, value) => setPage(value)}
                                                        showFirstButton
                                                        showLastButton

                                                    />
                                                </Stack>
                                                Total Records:{totalDataCount}
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