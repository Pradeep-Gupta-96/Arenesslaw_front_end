import React, { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system'
import Navbar from '../Navbar/Navbar'
import { Button, Grid, Paper } from '@mui/material';
import EmailEditor from 'react-email-editor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

const Createnotice = () => {
    const emailEditorRef = useRef(null);
    const [gethtml, setGethtml] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    //preparing notice
    const exportHtml = async() => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { html } = data;
            const Obj = {
                html: html
            }
            setGethtml(Obj)
        });

        try {
            const res = await fetch("http://localhost:4000/notice/savehtml", {
                method: "post",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(gethtml)
            })
            const result = await res.json()
            if(result.message==="Saved"){
                toast("Saved!", {
                    position: "top-center",
                    autoClose: 1000,
                    type: "success"
                  })
            }
        } catch (error) {
            console.log(error)
        }
    };

console.log(gethtml)

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <DrawerHeader />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <EmailEditor style={{ height: "77vh" }} ref={emailEditorRef} />
                            </Item>
                        </Grid>
                    </Grid>
                    <Item >
                        <Button variant='contained' onClick={exportHtml}>Save</Button>
                    </Item>
                </Box>
            </Box>
        </>
    )

}


export default Createnotice