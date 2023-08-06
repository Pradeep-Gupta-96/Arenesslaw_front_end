import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import {
    Button, Dialog, Grid, Link, List, ListItem, ListItemText, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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
const tableCSS = { cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(0.99)" } }

const DetailsPage = () => {

    const [data, setData] = useState('')


    const navigate = useNavigate()
    const { Xlid, singleid } = useParams()


    console.log(data)






    const API = `http://localhost:4000/excel/details/${Xlid}/${singleid}`
    const callapi = async (url) => {
        const res = await fetch(url, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })
        const result = await res.json()
        setData(result.message)
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
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper variant="outlined">
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Mail Date" secondary={data.Mail_Date} />
                                    </ListItem>


                                    <ListItem>
                                        <ListItemText primary="To" secondary={data.To} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Serial_Number" secondary={data.Serial_Number} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Name" secondary={data.Name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Address" secondary={data.Address} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Description_Client" secondary={data.Description_Client} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Address_Of_Client" secondary={data.Address_Of_Client} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Credit_type" secondary={data.Credit_type} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Account_No" secondary={data.Account_No} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cheque_No" secondary={data.Cheque_No} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cheque_Date" secondary={data.Cheque_Date} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cheque_Amount" secondary={data.Cheque_Amount} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cheque_Branch" secondary={data.Cheque_Branch} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Cheque_Bouncing" secondary={data.Cheque_Bouncing} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Return_Memo" secondary={data.Return_Memo} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Our_Bank" secondary={data.Our_Bank} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Ecs_Date" secondary={data.Ecs_Date} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Ecs_Bank" secondary={data.Ecs_Bank} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Ecs_Provider_Name" secondary={data.Ecs_Provider_Name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Overdue_Amount" secondary={data.Overdue_Amount} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Overdue_Date" secondary={data.Overdue_Date} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Emi_Amount" secondary={data.Emi_Amount} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="SPOC_Name" secondary={data.SPOC_Name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="SPOC_Number" secondary={data.SPOC_Number} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="SPOC_Email" secondary={data.SPOC_Email} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Payment_Link_For_Emi"  secondary={
                                            <Link href={data.Payment_Link_For_Emi} target="_blank" rel="noopener noreferrer">
                                                <Typography color="primary">{data.Payment_Link_For_Emi}</Typography>
                                            </Link>
                                        } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Payment_Link_For_Total_Dues"  secondary={
                                            <Link href={data.Payment_Link_For_Total_Dues} target="_blank" rel="noopener noreferrer">
                                                <Typography color="primary">{data.Payment_Link_For_Total_Dues}</Typography>
                                            </Link>
                                        }/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Date" secondary={data.Date} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Short_Link" secondary={
                                            <Link href={data.Short_Link} target="_blank" rel="noopener noreferrer">
                                                <Typography color="primary">{data.Short_Link}</Typography>
                                            </Link>
                                        } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Mail_Status" secondary={data.Mail_Status} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="_id" secondary={data._id} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>

    )

}


export default DetailsPage