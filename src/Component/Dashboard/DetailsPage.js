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
                        {Object.entries(data).map(([key, value]) => (
                            <View style={styles.tableRow} key={key}>
                                <Text style={styles.tableCellHeader}>{key}:</Text>
                                <Text style={styles.tableCellHeader}>{value}</Text>
                            </View>
                        ))}
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
                        <ListItem sx={{ display: "flex", justifyContent: "space-between", }}>
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
                        {Object.entries(data).map(([key, value]) => (
                            <Grid item xs={4} key={key}>
                                <ListItemText primary={key} secondary={value} />
                            </Grid>
                        ))}


                    </Grid >
                </Box >
            </Box >
        </>
    )

}


export default DetailsPage