import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
    Button, FormControl, Grid, InputLabel, Link, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Chart, CategoryScale, LinearScale, PieController, ArcElement, BarController, BarElement, Tooltip } from 'chart.js';
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
    const [datacount, setdatacount] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setpageSize] = useState(20)
    const chartRefp = useRef(null);
    const chartRef = useRef(null);

    const handleOnChange = (e) => {
        setSearchValue(e.target.value.toLowerCase());
    };

    const PageSizeSelector = ({ pageSize, onChange }) => (
        <FormControl variant="outlined" size="small" sx={{ marginLeft: 2 }}>
            <Select
                value={pageSize}
                onChange={onChange}
                label="Rows per page"
                inputProps={{
                    name: 'pageSize',
                    id: 'page-size-select',
                }}
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </FormControl>
    );

    // const filteredResults = results.filter((item) => {
    //     const searchData = item.EMBONAME ? item.EMBONAME.toLowerCase() : '';
    //     return searchData.includes(searchValue);
    // });

    const reset = () => {
        setSearchValue('');
    };

    const API = `https://recqarz.com/api/excel/exponedexcelldata/${id}`;

    const callApi = async (page) => {
        try {
            const res = await fetch(`${API}?pageSize=${pageSize}&page=${page}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });

            const result = await res.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * pageSize + index + 1, // Calculate the rowIndex based on the current page and index
            }));

            setResults(adjustedResultArray);
            setTotalDataCount(parseInt(result.totalPages));

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const API2 = `https://recqarz.com/api/excel/searchingAdmindata/${id}/${searchValue}`;

    const callSearchApi = async (page) => {
        try {
            const res = await fetch(`${API2}?pageSize=${pageSize}&page=${page}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });

            const result = await res.json()

            const resultArray = Array.isArray(result.message) ? result.message : [result.message];

            const adjustedResultArray = resultArray.map((item, index) => ({
                ...item,
                rowIndex: (page - 1) * pageSize + index + 1, // Calculate the rowIndex based on the current page and index
            }));

            setResults(adjustedResultArray);
            setTotalDataCount(parseInt(result.totalPages));

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const Chart_data_visualization_API = `https://recqarz.com/api/excel/Chart_data_visualization_admin/${id}`;

    const Chart_data_visualization_CallApi = async () => {
        try {
            const res = await fetch(`${Chart_data_visualization_API}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });

            const result = await res.json()

            setdatacount(result)
            setIsLoading(false);

            // Render the chart here, after data is fetched
            renderChart1(result);
            renderChart2(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        Chart_data_visualization_CallApi()

        if (searchValue.trim() === '') {
            // Call API for regular data if search value is empty
            callApi(page);
        } else {
            // Call search API if search value is present
            callSearchApi(page);
        }
    }, [page, pageSize, searchValue]);


    const clickfordeatils = (id) => {
        navigate(`/detailspage/${id}`);
    };

    const Indicator = ({ label, color, count }) => (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: color, marginRight: '8px' }}></div>
            <Typography variant="body2">{`${label}: ${count}`}</Typography>
        </div>
    );


    const renderChart1 = (data) => {
        Chart.register(CategoryScale, LinearScale, PieController, ArcElement, Tooltip);

        let chartInstance = null;
        const ctx = chartRefp.current.getContext('2d');

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Delivered', 'Deferred', 'Bounce', 'Drop', 'NA', 'Open'],
                datasets: [{
                    data: [data.deliveredCount, data.DeferredCount, data.BounceCount, data.dropCount, data.naCount, data.openCount],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(54, 102, 255, 0.9)',
                        "rgba(255, 205, 86, 0.8)",
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        '#dcedc8' // Orange
                    ],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.formattedValue || '';
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },

                elements: {
                    arc: {
                        borderWidth: 1,
                    },
                },
            }
        });

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };

    }


    const renderChart2 = (data) => {
        Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip);

        let chartInstance = null;
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Delivered', 'Undelivered', 'Expired', 'NA'],
                datasets: [{
                    label: '# of Votes',
                    data: [data.smsDeliveredCount, data.smsUndeliveredCount, data.smsExpiredCount, data.smsnaCount],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)', // Green
                        'rgba(153, 102, 255, 0.8)', // Purple
                        'rgba(255, 159, 64, 0.8)' // Orange
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 0.8)', // Blue
                        'rgba(255, 205, 86, 0.8)', // Yellow
                        'rgba(255, 99, 132, 0.8)', // Red
                        'rgba(75, 192, 192, 0.8)', // Purple
                        'rgba(255, 159, 64, 0.8)', // Orange
                        'rgba(75, 192, 192, 0.8)', // Green
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.formattedValue || '';
                                return `${label}: ${value}`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }

    return (
        <>
            <Box className="mainpage" sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box className='rightpart' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <AnimatedGridItem className='data-vs' item xs={12} md={12}>
                            <AnimatedGridItem item xs={6} md={6}>
                                Data Visualization Email
                                <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                                        <Indicator label="Delivered" color="rgba(153, 102, 255, 0.8)" count={datacount.deliveredCount} />
                                        <Indicator label="Deferred" color="rgba(54, 102, 255, 0.9)" count={datacount.DeferredCount} />
                                        <Indicator label="Bounce" color="rgba(255, 205, 86, 0.8)" count={datacount.BounceCount} />
                                        <Indicator label="Drop" color="rgba(54, 162, 235, 0.8)" count={datacount.dropCount} />
                                        <Indicator label="NA" color="rgba(255, 99, 132, 0.8)" count={datacount.naCount} />
                                        <Indicator label="Open" color="#dcedc8" count={datacount.openCount} />
                                    </div>
                                    <div style={{ width: '300px', height: '300px' }}>
                                        <canvas ref={chartRefp} id="myChart"></canvas>
                                    </div>
                                </Item>
                            </AnimatedGridItem>

                            <AnimatedGridItem item xs={6} md={6}>
                                Data Visualization SMS
                                <Item className='virtical' sx={{ display: 'inline-block', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className='virtical-chart' style={{ width: '100%', height: '280px' }} >
                                        <canvas ref={chartRef} id="myChart"></canvas>
                                    </div>
                                    <div style={{ marginLeft: '16px', display: 'flex' }}>
                                        <Indicator label="Delivered" color="rgba(153, 102, 255, 0.8)" count={datacount.smsDeliveredCount} />
                                        <Indicator label="Undelivered" color="rgba(255, 99, 132, 0.8)" count={datacount.smsUndeliveredCount} />
                                        <Indicator label="Expired" color='rgba(255, 205, 86, 0.8)' count={datacount.smsExpiredCount} />
                                        <Indicator label="NA" color='rgba(75, 192, 192, 0.8)' count={datacount.smsnaCount} />
                                    </div>
                                </Item>
                            </AnimatedGridItem>

                        </AnimatedGridItem>
                        <AnimatedGridItem sx={{ marginLeft: 2 }}>
                            Total Data ={datacount.totalDataCount}
                        </AnimatedGridItem>

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
                                <Stack spacing={2} >
                                    <div className="pagination-container">
                                        <div className="pagination-row">
                                            <Pagination
                                                count={totalDataCount}
                                                page={page}
                                                onChange={(event, value) => setPage(value)}
                                                showFirstButton
                                                showLastButton
                                                color="secondary"
                                            />
                                            <PageSizeSelector pageSize={pageSize} onChange={(event) => setpageSize(event.target.value)} />
                                            Rows Per page
                                        </div>
                                    </div>
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
