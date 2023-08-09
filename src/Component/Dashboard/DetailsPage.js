import React, { useEffect, useState } from 'react'
import {
    View,
    Page,
    Text,
    Document,
    PDFViewer,
} from '@react-pdf/renderer';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import {
    Button,
    Grid, Link, ListItem, ListItemText, Paper, Typography
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
const styles = {
    page: {
        padding: '20px',
        backgroundColor: '#ffffff', // White background
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
        color: '#000000', // Black text color
    },
    link: {
        fontSize: 12,
        marginBottom: 10,
        color: '#006400', // Dark green link color
        textDecoration: 'underline',
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderCollapse: 'collapse',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        display: 'table-row',
        width: "100%"
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#fff',
        textAlign: 'left',
        width: "50%",
        borderBottomWidth: "1px",
        borderColor: '#bfbfbf',

    },
    tableCell: {
        fontSize: 12,
        padding: 6,
        textAlign: 'center',
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
};

const DetailsPage = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const { Xlid, singleid } = useParams()
    const [pdfDownloadLink, setPdfDownloadLink] = useState(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const API = `http://16.16.45.44:4000/excel/details/${Xlid}/${singleid}`
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

    const generatePDF = () => {
        setIsGeneratingPDF(true);

        // Generate the PDF content
        const pdfContent = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.table}>
                        {/* Render the data fields in the PDF */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Mail_Date:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Mail_Date}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>To:-</Text>
                            <Text style={styles.tableCellHeader}>{data.To}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Serial_Number:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Serial_Number}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Name:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Address:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Address}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Description_Client:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Description_Client}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Address_Of_Client:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Address_Of_Client}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Credit_type:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Credit_type}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Account_No:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Account_No}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Emi_Amount:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Emi_Amount}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>SPOC_Name:-</Text>
                            <Text style={styles.tableCellHeader}>{data.SPOC_Name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>SPOC_Number:-</Text>
                            <Text style={styles.tableCellHeader}>{data.SPOC_Number}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>SPOC_Email:-</Text>
                            <Text style={styles.tableCellHeader}>{data.SPOC_Email}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Payment_Link_For_Emi:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Payment_Link_For_Emi}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Payment_Link_For_Total_Dues:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Payment_Link_For_Total_Dues}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Date:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Date}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Short_Link:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Short_Link}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Mail_Status:-</Text>
                            <Text style={styles.tableCellHeader}>{data.Mail_Status}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );

        // Render the PDF content using PDFViewer
        setPdfDownloadLink(
            <PDFViewer width="100%" height="600px">
                {pdfContent}
            </PDFViewer>
        );

        setIsGeneratingPDF(false);
    };




    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />

                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>

                        <Grid item xs={4}>

                            <ListItemText primary="Mail Date" secondary={data.Mail_Date} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="To" secondary={data.To} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Serial_Number" secondary={data.Serial_Number} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Name" secondary={data.Name} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Address" secondary={data.Address} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Description_Client" secondary={data.Description_Client} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Address_Of_Client" secondary={data.Address_Of_Client} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Credit_type" secondary={data.Credit_type} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Account_No" secondary={data.Account_No} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Emi_Amount" secondary={data.Emi_Amount} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="SPOC_Name" secondary={data.SPOC_Name} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="SPOC_Number" secondary={data.SPOC_Number} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="SPOC_Email" secondary={data.SPOC_Email} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Payment_Link_For_Emi" secondary={
                                <Link href={
                                    data.Payment_Link_For_Emi} target="_blank" rel="noopener noreferrer">
                                    <Typography color="primary">{data.Payment_Link_For_Emi}</Typography>
                                </Link>
                            } />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Payment_Link_For_Total_Dues" secondary={
                                <Link href={
                                    data.Payment_Link_For_Total_Dues} target="_blank" rel="noopener noreferrer">
                                    <Typography color="primary">{data.Payment_Link_For_Total_Dues}</Typography>
                                </Link>
                            } />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Date" secondary={data.Date} />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Short_Link" secondary={
                                <Link href={
                                    data.Short_Link} target="_blank" rel="noopener noreferrer">
                                    <Typography color="primary">{data.Short_Link}</Typography>
                                </Link>
                            } />

                        </Grid>
                        <Grid item xs={4}>

                            <ListItemText primary="Mail_Status" secondary={data.Mail_Status} />

                        </Grid>

                        <ListItem sx={{display: "flex", justifyContent: "space-between",}}>
                            <Link>
                                Back
                            </Link>
                            <Button
                                variant="contained"
                                onClick={generatePDF}
                                disabled={isGeneratingPDF}
                            >
                                {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                            </Button>

                        </ListItem>


                        {/* Render the PDFViewer */}
                        {pdfDownloadLink}
                    </Grid >
                </Box >
            </Box >
        </>
    )

}


export default DetailsPage