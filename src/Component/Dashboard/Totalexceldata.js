import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import Navbar from '../Navbar/Navbar'
import { Button, ButtonGroup, Grid, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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

const Totalexceldata = () => {
    const [results, setResults] = useState([])
    const [heders, setheaders] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
   

    const API = `http://localhost:4000/excel/${id}`
    const callapi = async (url) => {
        const res = await fetch(url)
        const result = await res.json()
        setheaders(result.message)
        setResults(result.message.xlData)
    }
    // console.log(heders)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        callapi(API)
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <List>
                                    <ListItem>
                                        <ListItemText >File Name <br /><strong>{heders.filename}</strong> </ListItemText>
                                        <ListItemText >Created Date <br /> <strong> {new Date(heders.createdAt).getDate()}-{new Date(heders.createdAt).toLocaleString('default', { month: 'short' })}-{new Date(heders.createdAt).getFullYear()}</strong></ListItemText>
                                        <ListItemText >Created Time <br /> <strong> {new Date(heders.createdAt).getHours()}-{new Date(heders.createdAt).getMinutes()}-{new Date(heders.createdAt).getSeconds()}</strong></ListItemText>
                                        <ListItemText >Records Uploaded <br /><strong>{results.length}</strong></ListItemText>
                                        <ListItemText >Email ID <br /><strong> {heders.emailformail}</strong></ListItemText>
                                        <ListItemText >Status <br /><strong> {heders.emailformail?"sent":"pending"}</strong></ListItemText>
                                        <ListItemText >File Uploaded <br /><strong>----</strong></ListItemText>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid sx={{ marginLeft: "auto", justifyContent: "space-between" }}>
                            <Item >
                                <ButtonGroup>
                                    <Button variant='contained' sx={{ backgroundColor: "#24D555" }}>Re-Send SMS</Button>
                                    <Button variant='contained' sx={{ backgroundColor: "#00AEC6" }}>Re-Send Email</Button>
                                </ButtonGroup>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead >
                                            <TableRow  >
                                                <TableCell><strong> S. No.</strong></TableCell>
                                                <TableCell><strong> Applicant Name</strong> </TableCell>
                                                <TableCell><strong>Email ID</strong></TableCell>
                                                <TableCell><strong>Phone Number</strong></TableCell>
                                                <TableCell><strong>Due Amount</strong></TableCell>
                                                <TableCell><strong>Actions</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                results.map((item, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                                            <TableCell >{index+1} </TableCell>
                                                            <TableCell sx={{ cursor: 'pointer' }} >{item.FPR_NAME}</TableCell>
                                                            <TableCell >{item["E-mail"]} </TableCell>
                                                            <TableCell >{item.MOBILEPHONE_HOME}</TableCell>
                                                            <TableCell >{item.DPI_Amount} </TableCell>
                                                            <TableCell >
                                                                <ButtonGroup>
                                                                    <Button variant='contained' sx={{ backgroundColor: "#24D555" }}>Re-Send SMS</Button>
                                                                    <Button variant='contained' sx={{ backgroundColor: "#00AEC6" }}>Re-Send Email</Button>
                                                                </ButtonGroup>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </>

    )

}

export default Totalexceldata 