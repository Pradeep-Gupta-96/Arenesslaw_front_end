import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import TextField from '@mui/material/TextField';
import { Link, json } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import * as FileServer from 'file-saver'
import XLSX from 'sheetjs-style'
import { toast } from 'react-toastify';
import '../style/style.css'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dialogfordata = () => {
    const [temp, setTemp] = useState('');
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [isLoading, setisLoading] = useState(false)
    let [filename, setFilename] = useState('')
    filename = filename.slice(0, -5)

    const handleChange = (event) => {
        setTemp(event.target.value);
    };

    //sample file download 
    const number = Math.floor(100000 + Math.random() * 900000);
    const Excelldata = [{
        "Notice_ID": `sample${number}`,
        'DATE': "",
        'ACCOUNT': "",
        'CARDNO': "",
        'FPR_NAME': "",
        'FPR_LD_LIN': "",
        'FPR_MOB': "",
        'EMBONAME': "",
        'ADDRESS1': "",
        'ADDRESS2': "",
        'CITY': "",
        'STATE': "",
        'PINCODE': "",
        'NEWRISKREGION': "",
        'NEW_CURR_BAL': "",
        'RISKCLASS': "",
        'BLOCK1': "",
        'BLOCK2': "",
        'ZONE': "",
        'SENDER': "",
        'BKT': "",
        'MOBILEPHONE_HOME': "",
        'TRIGGER': "",
        'ACTIVITY': "",
        'STAGE': "",
        'DPI_Amount': "",
        'Cur_Bal': "",
        'Notice_Amount_total': "",
        'E_mail': "",
        'REF_NO': "",
        'NOTICE_DATE': "",
    }]
    const downloadfiletype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const downloadfileName = `sample${number}`
    const downloadfilextention = '.xlsx';
    const exporttoexcel = async () => {
        const ws = XLSX.utils.json_to_sheet(Excelldata);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: downloadfiletype });
        FileServer.saveAs(data, downloadfileName + downloadfilextention)
    }

    // handle File for upload
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                setExcelFileError(null);
                setExcelFile(selectedFile);
                setFilename(e.target.files[0].name)
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }


    const handleSubmit = async () => {
        setisLoading(true);
        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('file', excelFile);
        try {
            if (excelFile !== null) {
                const res = await fetch('http://localhost:4000/excel', {
                    method: 'POST',
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    },
                    body: formData
                });
                const result = await res.json();
                console.log(result);
                handleResponse(result); // Handle the response
            }
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
            console.log(error);
        }
    };

    const handleResponse = (result) => {
        if (result.msg === 'running') {
            toast('Data uploaded!', {
                position: 'top-center',
                autoClose: 1000,
                type: 'success'
            });
            setExcelFile(null);
            reloadPage(); // Reload the page
        } else if (result.msg === 'Stop') {
            toast('Filename already exists!', {
                position: 'top-center',
                autoClose: 1000,
                type: 'warning'
            });
            setExcelFile(null);
            setisLoading(false);
        }
    };

    const reloadPage = () => {
        window.location.reload(); // Reload the page
    };


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                       
                        <Typography component="h1" variant="subtitle1" > Upload File</Typography>
                        <Item sx={{ height: 200 }}>
                            <DriveFileMoveIcon fontSize='large' />
                            <Typography component="h1" variant="subtitle1" > Drop Files Here to Upload</Typography>
                            <TextField type='file' name='file' onChange={handleFile} />
                            {excelFileError && <Item sx={{ color: "red" }}
                                style={{ marginTop: 5 + 'px' }}>{excelFileError}</Item>}
                        </Item>
                        <Typography variant="subtitle2" >Download input format
                            <Link onClick={exporttoexcel}> Click Here!</Link>
                        </Typography>
                        <DialogActions>
                            {isLoading ? (<div className="xlpost"></div>) : <Button color="secondary" variant="contained" onClick={handleSubmit}>Import...</Button>}
                        </DialogActions>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Dialogfordata