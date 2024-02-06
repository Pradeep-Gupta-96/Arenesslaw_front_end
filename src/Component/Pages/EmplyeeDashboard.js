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
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([])
    const revData = Array.isArray(results) ? [...results].reverse() : [];


    const onChangeDate = (event) => {
        setDateSearchValue(event.target.value);
    };

    const EmpolyeeTotaldata = (id) => {
        navigate(`/empolyeeTotaldata/${id}`)
    }


    const API1 = `http://localhost:4000/api/excel/getAllexceldata`;
    const API2 = `http://localhost:4000/api/excel/getAllexceldatabydate/${dateSearchValue}`;
    const API3 = `http://localhost:4000/api/excel/getAllexceldatabyNotice/${noticetype}`;

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
    const fetchData2 = async (page) => {
        try {
            const response = await fetch(`${API2}?page=${page}`, requestOptions)

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
    const fetchData3 = async (page) => {
        try {
            const response = await fetch(`${API3}?page=${page}`, requestOptions)

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

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        if (dateSearchValue && noticetype.trim() === '') {
            // Call API for date search if dateSearchValue is present and noticetype is empty
            fetchData2(page);
        } else if (noticetype.trim() !== '') {
            // Call API for noticetype search if noticetype is present
            fetchData3(page);
        } else {
            // Call API for regular data if no search criteria is present
            fetchData1(page);
        }
    }, [page, dateSearchValue, noticetype]);


    const handleChangefornoticetype = (event) => {
        setNoticetype(event.target.value);
    };

    const resetsearchbar = () => {
        setDateSearchValue('')
        setNoticetype('')
    }

    // const filteredData = revData.filter((item) => {
    //     const inputSearch = dateSearchValue.toLowerCase();
    //     const inputsearchtempp = noticetype.toLowerCase();

    //     const formattedDateTime = new Date(item.createdAt).toLocaleDateString('en-US', {
    //         day: 'numeric',
    //         month: 'short',
    //         year: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric'
    //     }).toLowerCase();

    //     const outputsearch = formattedDateTime;
    //     const outputsearchtemp = item.NoticeType.toLowerCase();

    //     return (
    //         outputsearch.startsWith(inputSearch) &&
    //         outputsearchtemp.startsWith(inputsearchtempp)
    //     );
    // });



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
                                        <TextField type='date' placeholder='Search by Date' size="small" sx={{ m: 1, minWidth: 200 }} value={dateSearchValue} onChange={onChangeDate} />
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