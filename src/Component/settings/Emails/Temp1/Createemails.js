import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import { Avatar, Button, ButtonGroup, Grid, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AdminNavbar from '../../../Navbar/AdminNavbar';
import '../../CKeditor.css'

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
const ListItemCSS = {
    display: 'block', cursor: "pointer",
    width: "100px",
    height: "100px",
    borderRadius: "100%",
    boxShadow: "0 0 0 10px #eceff1",
    background: "#eceff1"
}
const styles = {
    fileInput: {
        display: 'none', // hide the default input element
    },
    label: {
        display: 'block',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        boxShadow: '0 0 0 10px #eceff1',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    labelText: {
        display: 'block',
        textAlign: 'center',
        marginTop: '45px',
        fontSize: '14px',
        color: '#777',
    },
};

const Createemails = () => {
    const [ContentInner, setContentInner] = useState('')
    const [ContentFooter, setContentFooter] = useState('')
    const [Emaillogo, setEmaillogo] = useState('')
    const [avatarImage, setAvatarImage] = useState(null);
    const getinputdata = {
        title: "",
        subtitle: "",
        noticeid: "",
        noticeidEg: "",
        noticedate: "",
        noticedateEg: "",
        to: "",
        address: "",
        subject: "",
        subjecttitle: ""
    }
    const [inpudata, setInputdata] = useState(getinputdata)
    const navigate = useNavigate()
    // console.log(ContentInner)
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setEmaillogo(event.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatarImage(reader.result);
        };
    };

    const inputhandleonchange = (event) => {
        const { name, value } = event.target
        setInputdata({
            ...inpudata, [name]: value
        })
    }

    const onClickforreset = (e) => {
        setInputdata(getinputdata)
        setAvatarImage(null)
        setEmaillogo("")
        setContentInner("")
        setContentFooter("")
    }

    const Createemailtemplate = async () => {
        try {
          const formData = new FormData();
          formData.append("Emaillogo", Emaillogo);
          formData.append("title", inpudata.title);
          formData.append("subtitle", inpudata.subtitle);
          formData.append("noticeid", inpudata.noticeid);
          formData.append("noticeidEg", inpudata.noticeidEg);
          formData.append("noticedate", inpudata.noticedate);
          formData.append("noticedateEg", inpudata.noticedateEg);
          formData.append("to", inpudata.to);
          formData.append("address", inpudata.address);
          formData.append("subject", inpudata.subject);
          formData.append("subjecttitle", inpudata.subjecttitle);
          formData.append("ContentInner", ContentInner);
          formData.append("ContentFooter", ContentFooter);
          formData.append(
            "username",
            `${JSON.parse(localStorage.getItem("username"))}`
          );
          formData.append("role", `${JSON.parse(localStorage.getItem("role"))}`);
      
          const response = await fetch('http://localhost:4000/emailtemp', {
            method: 'POST',
            headers: {
              authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
            body: formData,
          });
      
          const result = await response.json();
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
            onClickforreset()
        }
        } catch (error) {
          console.log(error);
        }
      };
      


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])




    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AdminNavbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <label style={styles.label}>
                                {avatarImage ? (
                                    <Avatar sx={ListItemCSS} src={avatarImage} />
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            style={styles.fileInput}
                                            onChange={handleAvatarChange}
                                            accept="image/*"
                                        />
                                        <Typography variant="body2" component="span" style={styles.labelText}>
                                            LOGO
                                        </Typography>
                                    </>
                                )}
                            </label>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}> </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Enter title here" name='title' value={inpudata.title} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField label="Enter Sub title here" name='subtitle' value={inpudata.subtitle} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="Notice Id" name='noticeid' value={inpudata.noticeid} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="Notice Id 123456" name='noticeidEg' value={inpudata.noticeidEg} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="Notice Date" name='noticedate' value={inpudata.noticedate} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="Notice Date 03/05/2023" name='noticedateEg' value={inpudata.noticedateEg} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="<<to>>" name='to' value={inpudata.to} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField label="<<address>>" name='address' value={inpudata.address} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField label="Subject" name='subject' value={inpudata.subject} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField label="Subject Title" name='subjecttitle' value={inpudata.subjecttitle} onChange={inputhandleonchange} variant="outlined" size="small" fullWidth />
                        </Grid>
                        {/* ==============ck-editor text areas==============  */}
                        <Grid item xs={12} >
                            <Item sx={{ m: 1 }}>
                                <Typography><strong>Inner Section</strong></Typography>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={ContentInner}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContentInner(data);

                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12} >
                            <Item sx={{ m: 1 }}>
                                <Typography><strong>Footer Section</strong></Typography>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={ContentFooter}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContentFooter(data);
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <ButtonGroup>
                                <Button onClick={onClickforreset}>Reset</Button>
                                <Button onClick={Createemailtemplate}>Submit</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </>
    )

}


export default Createemails