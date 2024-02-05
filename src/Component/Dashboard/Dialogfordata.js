import React, { useState, useMemo } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
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
    const [temp, setTemp] = useState("SBI");
    const [noticetype, setNoticetype] = useState("");
    const [ExecutionDate, setDateSearchValue] = useState({ExecutionDate:""});
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [isLoading, setisLoading] = useState(false)
    let [filename, setFilename] = useState('')
    filename = filename.slice(0, -5)

    const handleChange = (event) => {
        setTemp(event.target.value);
    };

    const handleChangefornoticetype = (event) => {
        setNoticetype(event.target.value);
    };


    const onChangeDate = (event) => {
        setDateSearchValue(event.target.value);
    };

    console.log(ExecutionDate);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };
    //sample file download 
    const currentDate = formatDate(Date.now());

    const memoizedExcelData = useMemo(() => {
        return [{
            "REF_NO": "",
            "DATE": "",
            "ACCOUNT": "",
            "CARDNO": "",
            "FPR_NAME": "",
            "FPR_LD_LIN": "",
            "FPR_MOB": "",
            "EMBONAME": "",
            "ADDRESS1": "",
            "ADDRESS2": "",
            "CITY": "",
            "STATE": "",
            "PINCODE": "",
            "NNR": "",
            "NEW_CURR BAL": "",
            "RISKCLASS": "",
            "BLOCK1": "",
            "BLOCK2": "",
            "INT FLAG": "",
            "ZONE": "",
            "SENDER": "",
            "BKT": "",
            "MOBILEPHONE_HOME": "",
            "TREGGER": "",
            "ACTIVITY": "",
            "STAGE": "",
            "Email Id": "",
            "REQUEST RAISE BY": "",
            "Region": "",
            "Language": "",
            "Opertaional Status": "",
            "Short Link": "",
            "SMS Status": "",
            "EMAIL STATUS": ""
        }]
    }, [])

    const downloadfiletype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const downloadfileName = `sample${currentDate}`
    const downloadfilextention = '.xlsx';

    const exporttoexcel = () => {
        const ws = XLSX.utils.json_to_sheet(memoizedExcelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: downloadfiletype });
        FileServer.saveAs(data, downloadfileName + downloadfilextention);
    };

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
        formData.append('Bank', temp);
        formData.append('NoticeType', noticetype);
        formData.append('ExecutionDate', ExecutionDate);
        formData.append('file', excelFile);
        try {
            if (excelFile !== null) {
                const res = await fetch('https://recqarz.com/api/excel', {
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
                        <Item sx={{ width: 450 }}>
                        <TextField type='date' placeholder='Search by Date' size="small" sx={{ m: 1, minWidth: 200 }} name='ExecutionDate' value={ExecutionDate.ExecutionDate} onChange={onChangeDate} />
                        </Item>
                        <Item sx={{ width: 450 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={temp}
                                    label="Bank"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"SBI"}>SBI</MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
                        <Item sx={{ width: 450 }}>
                            <FormControl fullWidth>
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
                                    <MenuItem value={"E-Conciliation"}> E-Conciliation </MenuItem>
                                    <MenuItem value={"Police Complaint"}> Police Complaint </MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
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