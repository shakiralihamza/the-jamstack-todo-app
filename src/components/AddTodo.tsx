import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Paper} from "@mui/material";
// import {useContext} from "react";
// import {MyContext} from "../context/MyContext";

export default function AddTodo() {
    // const {setIsDialogOpen} = useContext(MyContext);

    const handleDialogOpen = () => {
        // setIsDialogOpen(true);
    };
    return (
        <Box sx={{flexGrow: 1, mb:3}}>
            <AppBar position="static" sx={{backgroundColor: 'primary.dark'}}>
                <Toolbar sx={{height: '80px'}} disableGutters>
                    <Box sx={{flexGrow: 1}}/>
                    <Paper elevation={3} sx={{mt: 5,height:'80px',width:'80px',backgroundColor:'transparent'}}>
                        <IconButton
                            disableRipple
                            size="large"
                            color="inherit"
                            onClick={handleDialogOpen}
                            sx={{
                                backgroundColor: 'secondary.main',
                                borderRadius: 0,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                height: '100%',
                                width: '100%',
                                ml:0,
                            }}
                        >
                            <AddCircleOutlineIcon sx={{color:'white'}} fontSize={'large'}/>
                        </IconButton>
                    </Paper>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
