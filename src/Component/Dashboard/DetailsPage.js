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
    Grid, Link, List, ListItem, ListItemText, Typography
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
        color: "#1976d2"

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
    const [noticetype, setNoticetype] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const [pdfDownloadLink, setPdfDownloadLink] = useState(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const callapi = async (url) => {
        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            });

            if (res.ok) {
                const result = await res.json();
                setData(result.message);
                return result.message.ACCOUNT;
            } else {
                console.error("API request failed with status:", res.status);
                return;
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
            return;
        }
    }

    const callAPIforfindnoticetype = async () => {
        try {
            const account = await callapi(`https://crm.recqarz.com/api/excel/detailsPage/${id}`);

            if (account) {
                const APIforfindnoticetype = `https://crm.recqarz.com/api/excel/allnoticesofoneusers/${account}`;

                const res = await fetch(APIforfindnoticetype, {
                    headers: {
                        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setNoticetype(result.message);

                } else {
                    console.error("API request failed with status:", res.status);
                }
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        callAPIforfindnoticetype();
    }, []);


    const generatePDF = () => {
        setIsGeneratingPDF(true);

        // Generate the PDF content
        const pdfContent = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"REF_NO"}:</Text>
                            <Text style={styles.tableCellHeader}>{data.REF_NO}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"ACCOUNT"}:</Text>
                            <Text style={styles.tableCellHeader}>{data.ACCOUNT}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"FPR_NAME"}:</Text>
                            <Text style={styles.tableCellHeader}>{data.FPR_NAME} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"EMBONAME"}:</Text>
                            <Text style={styles.tableCellHeader}>{data.EMBONAME} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"STATE"}:</Text>
                            <Text style={styles.tableCellHeader}>{data.STATE} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"NEW_CURR BAL"}:</Text>
                            <Text style={styles.tableCellHeader}>{data['NEW_CURR BAL']} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"SMS Status"}:</Text>
                            <Text style={styles.tableCellHeader}>{data['SMS Status']} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"EMAIL STATUS"}:</Text>
                            <Text style={styles.tableCellHeader}>{data['EMAIL STATUS']} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"Email Id"}:</Text>
                            <Text style={styles.tableCellHeader}>{data['Email Id']} </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>{"Short Link"}:</Text>
                            <Text style={styles.tableCellHeader}>{data['Short Link']}</Text>
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
                    <div className='userdetail'>
                        <Grid container spacing={2}>
                            <ListItem sx={{ display: "flex", justifyContent: "space-between", }}>

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

                            <Grid item xs={4} >
                                <ListItemText primary={"REF_NO"} secondary={data.REF_NO} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"ACCOUNT"} secondary={data.ACCOUNT} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"FPR_NAME"} secondary={data.FPR_NAME} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"EMBONAME"} secondary={data.EMBONAME} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"STATE"} secondary={data.STATE} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"NEW_CURR BAL"} secondary={data['NEW_CURR BAL']} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"SMS STATUS"} secondary={data['SMS Status']} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"EMAIL STATUS"} secondary={data['EMAIL STATUS']} />
                            </Grid>
                            <Grid item xs={4} >
                                <ListItemText primary={"EMAIL ID"} secondary={data['Email Id']} />
                            </Grid>

                            <Grid item xs={4}>
                                <ListItemText primary="SHORT LINK" secondary={
                                    <Typography color="primary">
                                        <Link href={data['Short Link']} target="_blank" rel="noopener noreferrer">
                                            {data['Short Link']}
                                        </Link>
                                    </Typography>
                                } />
                            </Grid>
                        </Grid >




                    </div>
                    <div className='userdetail notice-type'>
                        <h4>SENDED NOTICE TYPE</h4>
                        {
                            noticetype.map((item, index) => {
                                return (
                                    <>
                                        <Grid key={index} item xs={4} >
                                            <ListItemText primary={"NoticeType"} secondary={item.NoticeType} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <ListItemText primary="SHORT LINK" secondary={
                                                <Typography color="primary">
                                                    <Link href={data['Short Link']} target="_blank" rel="noopener noreferrer">
                                                        {item['Short Link']}
                                                    </Link>
                                                </Typography>
                                            } />
                                        </Grid>
                                        <Grid item xs={4} >
                                            <ListItemText primary={"EMAIL STATUS"} secondary={item['EMAIL STATUS']} />
                                        </Grid>
                                    </>
                                )
                            })
                        }
                    </div>

                </Box >
            </Box >
        </>
    )

}


export default DetailsPage