import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Divider, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dialogresendemail = () => {
    const [temp, setTemp] = useState('');

    const handleChange = (event) => {
        setTemp(event.target.value);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Previously used email</Typography>
                        <Typography>cc@areness.com</Typography><br />
                        <Divider />
                        <Typography variant='h6'>Resend Email from</Typography>
                        <Item sx={{ width: 450 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Email</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={temp}
                                    label="Email"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"cc@arenesslaw.com"}>cc@arenesslaw.com</MenuItem>
                                    <MenuItem value={"cc@arenesslaw.com"}>cc@arenesslaw.com</MenuItem>
                                    <MenuItem value={"cc@arenesslaw.com"}>cc@arenesslaw.com</MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
                        <DialogActions>
                            <Button color="secondary" variant="contained" >Send</Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default Dialogresendemail