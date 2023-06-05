import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Grid, InputLabel, MenuItem, FormControl, Select, Typography, Button, Paper } from '@mui/material';
import { Chart, CategoryScale, LinearScale, PieController, ArcElement, BarController, BarElement, Tooltip } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../Navbar/AdminNavbar';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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

const Indicator = ({ label, color, count }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ width: '16px', height: '16px', backgroundColor: color, marginRight: '8px' }}></div>
        <Typography variant="body2">{`${label}: ${count}`}</Typography>
    </div>
);

const AdminDashboard = () => {
    const [campany, setompany] = useState('');
    const navigate = useNavigate()
    const [greeting, setGreeting] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const chartRefp = useRef(null);
    const chartRef = useRef(null);

    const handleChange = (event) => {
        setompany(event.target.value);
    };


    const submit = () => {
        if (campany === "") {
            toast("select company", {
                position: "top-center",
                autoClose: 1000
            })
        } else {
            localStorage.setItem("comapny", JSON.stringify(campany))
            navigate("/notice")
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })

    //circuler chart

    useEffect(() => {
        Chart.register(CategoryScale, LinearScale, PieController, ArcElement, Tooltip);

        let chartInstance = null;
        const ctx = chartRefp.current.getContext('2d');

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Total file', 'Total Mail', 'Mail Delivered', 'Mail Viewed', 'Pending Mails', 'Succes'],
                datasets: [{
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)', // Red
                        'rgba(54, 162, 235, 0.8)', // Blue
                        'rgba(255, 205, 86, 0.8)', // Yellow
                        'rgba(153, 102, 255, 0.8)', // Purple
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
    }, []);


    //vertical chart
    useEffect(() => {
        Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip);

        let chartInstance = null;
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total file', 'Total Mail', 'Mail Delivered', 'Mail Viewed', 'Pending Mails', 'Succes'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 6, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)', // Red
                        'rgba(54, 162, 235, 0.8)', // Blue
                        'rgba(255, 205, 86, 0.8)', // Yellow
                        'rgba(75, 192, 192, 0.8)', // Green
                        'rgba(153, 102, 255, 0.8)', // Purple
                        'rgba(255, 159, 64, 0.8)' // Orange
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 0.8)', // Blue
                        'rgba(255, 205, 86, 0.8)', // Yellow
                        'rgba(255, 99, 132, 0.8)', // Red
                        'rgba(153, 102, 255, 0.8)', // Purple
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
    }, []);


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
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <AnimatedGridItem item xs={12} md={8}>
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
                        <AnimatedGridItem item xs={12} md={4}>
                            <Item>
                                <Typography component="h1" variant="h6" > Select Company</Typography>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Company</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={campany}
                                        label="Company"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={"SBI Credit Cards"}>SBI Credit Cards</MenuItem>
                                        <MenuItem value={"Mobikwik"}>Mobikwik</MenuItem>
                                        <MenuItem value={"Vodafone"}>vodafone</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="secondary" onClick={submit} >
                                    Proceed....
                                </Button>
                            </Item>
                        </AnimatedGridItem>

                        <Grid item xs={12} md={12}>
                            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                                    <Indicator label="Total file" color="rgba(255, 99, 132, 0.8)" count={12} />
                                    <Indicator label="Total Mail" color="rgba(54, 162, 235, 0.8)" count={19} />
                                    <Indicator label="Mail Delivered" color="rgba(255, 205, 86, 0.8)" count={3} />
                                    <Indicator label="Mail Viewed" color="rgba(153, 102, 255, 0.8)" count={5} />
                                    <Indicator label="Pending Mails" color="#dcedc8" count={2} />
                                </div>
                                <div style={{ width: '300px', height: '300px' }}>
                                    <canvas ref={chartRefp} id="myChart"></canvas>
                                </div>
                                <div></div>
                            </Item>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ width: '550px', height: '350px' }} >
                                    <canvas ref={chartRef} id="myChart"></canvas>
                                </div>
                                <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                                <Indicator label="Total file" color="rgba(255, 99, 132, 0.8)" count={12} />
                                    <Indicator label="Total Mail" color="rgba(54, 162, 235, 0.8)" count={19} />
                                    <Indicator label="Mail Delivered" color="rgba(255, 205, 86, 0.8)" count={3} />
                                    <Indicator label="Mail Viewed" color="rgba(153, 102, 255, 0.8)" count={5} />
                                    <Indicator label="Pending Mails" color="#dcedc8" count={2} />
                                </div>
                                <div></div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AdminDashboard