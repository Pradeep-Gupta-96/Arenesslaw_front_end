import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import {
    Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Grid, List, ListItem,
    ListItemText, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, makeStyles
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AdminNavbar from '../Navbar/AdminNavbar';
import '../style/style.css'
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IconsCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", borderRadius: "50%", transform: "scale(1.2)" } }
const tableCSS = {  cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }


const Totalexceldata = () => {
    const [open1, setopen1] = useState(false);
    const [open2, setopen2] = useState(false);
    const [results, setResults] = useState([])
    const [heders, setheaders] = useState([])
    const [isloading, setisLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchValue, setSearchValue] = useState('');

    const handleOnChange = (e) => {
      setSearchValue(e.target.value.toLowerCase());
    };

    const filteredResults = results.filter((item) => {
        const searchData = item.Name ? item.Name.toLowerCase() : '';  // Check if Name exists
        return searchData.includes(searchValue);
      });

      const reset=()=>{
        setSearchValue()
      }


    const handleClose2 = () => {
        setopen2(false);
    };

    const API = `http://localhost:4000/excel/${id}`
    const callapi = async (url) => {
        const res = await fetch(url, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })
        const result = await res.json()
        setheaders(result.message)
        setResults(result.message.xlData)
        setisLoading(false)
    }

    const clickfordeatils=(Xlid,singleid)=>{
        navigate(`/detailspage/${Xlid}/${singleid}`)
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        callapi(API);
    }, []);


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <AnimatedGridItem item xs={12} >
                            <Item sx={{ display: "flex", justifyContent: "space-between", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }}    >
                                <TextField type='Search'value={searchValue} placeholder='file name' size="small" sx={{ m: 1, minWidth: 200 }} onChange={handleOnChange} />
                              

                                <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={reset} >Reset</Button>

                            </Item>
                        </AnimatedGridItem>

                        <AnimatedGridItem item xs={12}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    {isloading ? (
                                        <div className="loading"></div>
                                    ) :
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow  >
                                                    <TableCell><strong> S. No.</strong></TableCell>
                                                    <TableCell><strong> Applicant Name</strong> </TableCell>
                                                    <TableCell><strong>Actions</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                   filteredResults.map((item, index) => {
                                                        return (
                                                            <TableRow sx={tableCSS} hover role="checkbox" tabIndex={-1} key={item._id}>

                                                                <TableCell  >{index + 1} </TableCell>
                                                                <TableCell sx={{ cursor: 'pointer' }} >{item.Name}</TableCell>
                                                                <TableCell >
                                                                    <Button  onClick={()=>{clickfordeatils(id,item._id)}}>
                                                                        open
                                                                    </Button>
                                                                </TableCell>

                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    }
                                </TableContainer>
                            </Paper>
                        </AnimatedGridItem>
                        <Dialog
                            open={open2}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose2}
                            aria-describedby="alert-dialog-slide-description"
                        >

                        </Dialog>
                    </Grid>
                </Box>
            </Box>
        </>

    )

}

export default Totalexceldata 