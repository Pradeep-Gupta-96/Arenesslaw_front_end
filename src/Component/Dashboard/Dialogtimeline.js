import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Divider, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dialogtimeline = () => {
    const [temp, setTemp] = useState('');

    const handleChange = (event) => {
        setTemp(event.target.value);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                      <Typography variant='h5'><strong>Happy Singh’s Timeline</strong></Typography><br />
                      <Typography variant='subtitle1' sx={{color:"#0BBDDD"}}>User History</Typography>
                      <Divider/>
                     <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>28 Feb</strong> <br />12:30 PM</TableCell>
                                <TableCell><Item> <strong> Reply received </strong> <br />User shared revert on cc@areness.com</Item></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>28 Feb</strong> <br />12:30 PM</TableCell>
                                <TableCell><Item> <strong> Reply received </strong> <br />User shared revert on cc@areness.com</Item></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>28 Feb</strong> <br />12:30 PM</TableCell>
                                <TableCell><Item> <strong> Reply received </strong> <br />User shared revert on cc@areness.com</Item></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>28 Feb</strong> <br />12:30 PM</TableCell>
                                <TableCell><Item> <strong> Reply received </strong> <br />User shared revert on cc@areness.com</Item></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>28 Feb</strong> <br />12:30 PM</TableCell>
                                <TableCell><Item> <strong> Reply received </strong> <br />User shared revert on cc@areness.com</Item></TableCell>
                            </TableRow>
                        </TableBody>
                     </Table>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}



export default Dialogtimeline