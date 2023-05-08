import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom';
import {
    ButtonGroup, Typography, Paper, Grid, Button, Dialog, DialogContent, DialogTitle, Slide, Table, TableRow,
    TableHead, TableBody, TableCell, TableContainer, InputLabel, MenuItem, FormControl, Select, TextField
} from '@mui/material';
import Dialogfordata from '../Dashboard/Dialogfordata';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from 'react-toastify'
import AdminNavbar from '../Navbar/AdminNavbar';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Notice = () => {
    const [open, setOpen] = useState(false);
    const [emailformaill, setEmailformail] = useState({ emailformail: "" });
    const [results, setResults] = useState([])
    const [inputsearchvalue, setInputsearchvalue] = useState('')
    const [inputsearchmail, setinputsearchmail] = useState('');
    const [inputsearchtemp, setinputsearchtemp] = useState('');
    const navigate = useNavigate();
    const revData = [...results].reverse()

    const handleChange = (event) => {
        const { name, value } = event.target
        setEmailformail({ ...emailformaill, [name]: value });
    };
    // console.log(emailformaill)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const totalexceldata = (id) => {
        navigate(`/totalexceldata/${id}`)
    }

    const API = (JSON.parse(localStorage.getItem("role")) === "Admin") ? "http://localhost:4000/excel/all" : "http://localhost:4000/excel"
    const callapi = async (url) => {
        const res = await fetch(url, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })
        const result = await res.json()
        setResults(result.message)
    }
    // console.log(revData)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        callapi(API)
    })


    const sendemail = async (id) => {
        if (!emailformaill.emailformail) {
            toast("select email!", {
                position: "top-center",
                autoClose: 1000,
                type: "error"
            })
            return
        }
        try {
            const res = await fetch(`http://localhost:4000/notice/sendemail/${id}`, {
                method: "put",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(emailformaill)
            })
            const result = await res.json()
            if (result.message === "Saved") {
                toast("email sent successfull!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onChange = (event) => {
        setInputsearchvalue(event.target.value)
    }
    const searchhandleChangeT = (event) => {
        setinputsearchtemp(event.target.value);
    };

    const searchhandleChangeM = (event) => {
        setinputsearchmail(event.target.value);
    };

    const resetsearchbar = () => {
        setInputsearchvalue('')
        setinputsearchtemp('')
        setinputsearchmail('')
    }
    const UploadFileIconCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { transform: "scale(1.2)" } }
    const UploadFileIconCSS1 = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { transform: "rotate(360deg)" } }
    const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Item sx={tableCSS} >
                                    <Typography variant="subtitle1" gutterBottom>Hellow User!</Typography>
                                    <Typography variant="h4" gutterBottom>Welcome to {`${JSON.parse(localStorage.getItem("comapny"))}`}</Typography>
                                </Item>
                            </Grid>

                            {/*================ Dialog ============== */}
                            <Grid item xs={2}>
                                <Item>
                                    <UploadFileIcon color="secondary" sx={UploadFileIconCSS1} onClick={handleClickOpen} /> <br />
                                    <Button variant="contained" sx={UploadFileIconCSS} color="secondary" onClick={handleClickOpen}>
                                        Bulk Upload
                                    </Button>
                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Bulk Upload File!"}</DialogTitle>
                                        <DialogContent>
                                            <Dialogfordata />
                                        </DialogContent>
                                    </Dialog>
                                </Item>
                            </Grid>

                            {/*================ Searchbar ============== */}
                            <Grid item xs={12} >
                                <Item sx={{ display: "flex", justifyContent: "space-between", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" }  }}    >
                                    <TextField type='Search' placeholder='file name' size="small" sx={{ m: 1, minWidth: 200 }} onChange={onChange} />
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Notice Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={inputsearchtemp}
                                            label="Notice Type"
                                            onChange={searchhandleChangeT}
                                        >
                                            <MenuItem value=''><em>none</em></MenuItem>
                                            <MenuItem value={"areness attorneys"}>areness attorneys </MenuItem>
                                    <MenuItem value={"Legal & Associates"}>Legal & Associates</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Email ID</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={inputsearchmail}
                                            label="Email ID"
                                            onChange={searchhandleChangeM}
                                        >
                                            <MenuItem value=''><em>none</em></MenuItem>
                                            <MenuItem value={"noreply@areness.com"}>noreply@areness.com</MenuItem>
                                            <MenuItem value={"cc@arness.com"}>cc@arness.com</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={resetsearchbar} >Reset</Button>
                                    <Button>
                                        <Link>

                                        </Link>
                                    </Button>
                                </Item>
                            </Grid>

                            {/*================ Table ============== */}
                            <Grid item xs={12}>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell>S. No.</TableCell>
                                                    <TableCell>File Name</TableCell>
                                                    <TableCell> Created Date</TableCell>
                                                    <TableCell>Notice Type</TableCell>
                                                    <TableCell>Email ID</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {revData
                                                    .filter((item) => {
                                                        const inputsearch = inputsearchvalue.toLowerCase()
                                                        const inputsearchtempp = inputsearchtemp.toLowerCase()
                                                        const inputsearchmaill = inputsearchmail.toLowerCase()
                                                        const outputsearch = item.filename.toLowerCase()
                                                        const outputsearchtemp = item.template.toLowerCase()
                                                        const outputsearchmailll = item.emailformail ? item.emailformail.toLowerCase() : " "
                                                        return ((outputsearch && outputsearch.startsWith(inputsearch))
                                                            && (outputsearchtemp && outputsearchtemp.startsWith(inputsearchtempp))
                                                            && (outputsearchmailll && outputsearchmailll.startsWith(inputsearchmaill)))
                                                    })
                                                    .map((item, index) => {
                                                        return (
                                                            <TableRow sx={tableCSS} hover role="checkbox" tabIndex={-1} key={item._id}  >
                                                                <TableCell >{index + 1}</TableCell>
                                                                <TableCell onClick={() => totalexceldata(item._id)} sx={{ cursor: 'pointer' }}  >
                                                                    {item.filename} <br />Count - {item.xlData.length}
                                                                </TableCell>
                                                                <TableCell>{new Date(item.createdAt).getDate()}
                                                                    -{new Date(item.createdAt).toLocaleString('default', { month: 'short' })}
                                                                    -{new Date(item.createdAt).getFullYear()}
                                                                </TableCell>
                                                                <TableCell>{item.template}</TableCell>
                                                                <TableCell >
                                                                    {item.emailformail ? item.emailformail
                                                                        :
                                                                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                                                            <InputLabel id="demo-simple-select-label">Select email</InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                name='emailformail'
                                                                                value={emailformaill.emailformail}
                                                                                label="Select email"
                                                                                onChange={handleChange}
                                                                            >
                                                                                <MenuItem value=''><em>none</em></MenuItem>
                                                                                <MenuItem value={"noreply@areness.com"}>noreply@areness.com</MenuItem>
                                                                                <MenuItem value={"cc@arness.com"}>cc@arness.com</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    }
                                                                </TableCell>
                                                                <TableCell >
                                                                    <ButtonGroup variant="non">
                                                                        {item.emailformail ? <Button variant='contained' sx={{ px: 5 }} disabled>Sent</Button>
                                                                            : <Button variant='contained' sx={{ backgroundColor: "#24D555" }} onClick={() => sendemail(item._id)}>Sent email</Button>}
                                                                        <Button variant='contained' sx={{ backgroundColor: "#0BBDDD" }}>Send SMS</Button>
                                                                        {item.emailformail ? <Button disabled><VisibilityIcon /></Button> : <Button><VisibilityIcon /></Button>}
                                                                        {item.emailformail ? <Button disabled><AccessTimeIcon /></Button> : <Button><AccessTimeIcon /></Button>}
                                                                        {item.emailformail ? <Button disabled><FileDownloadIcon /></Button> : <Button><FileDownloadIcon /></Button>}
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                            </TableBody>
                                        </Table>
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

export default Notice