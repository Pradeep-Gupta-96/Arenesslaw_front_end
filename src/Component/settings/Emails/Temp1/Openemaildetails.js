import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Grid, Paper, Typography, InputBase, ButtonGroup, Button, TableHead, TableContainer, TableRow, TableCell, TableBody, Table } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AdminNavbar from '../../../Navbar/AdminNavbar';


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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }

const Openemaildetails = () => {
    const [PdfUrl, setPdfUrl] = useState("")
    const [id, setId] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })

    const ADDemail = () => {
        navigate("/createemails")
    }
    const onClickforViewPdf = async () => {
        const response = await fetch("http://localhost:4000/emailtemp", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const result = await response.blob()
        const pdfUrl = URL.createObjectURL(result);
        setPdfUrl(pdfUrl);
    }

    const forupdating = async () => {
        const response = await fetch("http://localhost:4000/emailtemp/data", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const result = await response.json()
        setId(result)
    }

    const onClickforupdate = (id) => {
        navigate(`/editmailtemp/${id}`)
    }

    useEffect(() => {
        onClickforViewPdf()
        forupdating()
    }, [])



    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid>
                        <Item sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h4'> Email - Template</Typography>
                            <Button variant="contained" sx={{
                                cursor: "pointer",
                                transition: "transform 0.5s ease",
                                "&:hover": {
                                    transform: "scale(1.2)",
                                    color: "#fff"
                                }
                            }} onClick={ADDemail}> + Add New</Button>
                        </Item>
                        <br />
                        <Item sx={tableCSS}>
                            <Item sx={{ ml: 110 }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                                </Search>
                            </Item>
                        </Item>
                    </Grid><br />
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow  >
                                            <TableCell><strong>Template Name</strong></TableCell>
                                            <TableCell><strong>Actions</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={tableCSS} hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={{ cursor: 'pointer' }} ><strong>0123-Notices </strong><br />Last Updated on: 04 Apr 2023</TableCell>
                                            <TableCell >
                                                <ButtonGroup>
                                                    {id.map((item) => {
                                                        return <Button variant='non' title='edit' key={item._id} onClick={() => onClickforupdate(item._id)}><EditOutlinedIcon /></Button>
                                                    })}
                                                    <Button variant='non' title='View Notice'>
                                                        {PdfUrl && (
                                                            <a href={PdfUrl} target="_blank" rel="noopener noreferrer">
                                                                <RemoveRedEyeOutlinedIcon />
                                                            </a>
                                                        )}
                                                    </Button>
                                                    <Button variant='non'><Inventory2OutlinedIcon /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
        </>


    )

}



export default Openemaildetails