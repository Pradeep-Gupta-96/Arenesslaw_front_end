import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Button, ButtonGroup, Grid, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AdminNavbar from '../../../Navbar/AdminNavbar';
import '../../CKeditor.css';

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

const Createscript = () => {
    const [contentInner, setContentInner] = useState('');
    const [contentFooter, setContentFooter] = useState('');

    const getInitialInputData = {
        Subject: '',
        SubjectContent: '',
        CustomerName: '',
    };
    const [inputData, setInputData] = useState(getInitialInputData);
    const navigate = useNavigate();

    const inputHandleOnChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
    };

    const onClickForReset = () => {
        setInputData(getInitialInputData);
        setContentInner('');
        setContentFooter('');
    };

    const CreateScript = async () => {
        try {
            const requestData = {
                Subject: inputData.Subject,
                SubjectContent: inputData.SubjectContent,
                CustomerName: inputData.CustomerName,
                ContentInner: contentInner,
                ContentFooter: contentFooter,
                username:JSON.parse(localStorage.getItem('username')),
                role: JSON.parse(localStorage.getItem('role')),
              };
            const response = await fetch('http://localhost:4000/emailscript/script', {
                method: 'POST',
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();
            console.log(result);
            if (!result) {
                toast('You have already created a template which you can edit', {
                    position: 'top-center',
                    autoClose: 1000,
                    type: 'error',
                });
            } else {
                toast('Script Created Successfully', {
                    position: 'top-center',
                    autoClose: 1000,
                    type: 'success',
                });
                onClickForReset()
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Subject"
                                name="Subject"
                                value={inputData.Subject}
                                onChange={inputHandleOnChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Subject Content"
                                name="SubjectContent"
                                value={inputData.SubjectContent}
                                onChange={inputHandleOnChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Dear [Customer's Name]"
                                name="CustomerName"
                                value={inputData.CustomerName}
                                onChange={inputHandleOnChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        {/* ==============ck-editor text areas============== */}
                        <Grid item xs={12}>
                            <Item sx={{ m: 1 }}>
                                <Typography>
                                    <strong>Inner Section</strong>
                                </Typography>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={contentInner}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContentInner(data);
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item sx={{ m: 1 }}>
                                <Typography>
                                    <strong>Footer Section</strong>
                                </Typography>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={contentFooter}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContentFooter(data);
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <ButtonGroup>
                                <Button onClick={onClickForReset}>Reset</Button>
                                <Button onClick={CreateScript}>Submit</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Createscript;
