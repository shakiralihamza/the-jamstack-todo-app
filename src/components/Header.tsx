import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import Button from "@mui/material/Button";
import netlifyIdentity from 'netlify-identity-widget';
import {useEffect} from "react";
import {Link} from "gatsby";
import MyContext from "../context/MyContext";

export default function Header() {
    const {setUser} = React.useContext(MyContext);

    useEffect(() => {
        netlifyIdentity.init();
    });

    netlifyIdentity.on('login', (user) => {
        console.log('User logged in', user);
        netlifyIdentity.close();
        setUser(user);
    });
    netlifyIdentity.on('logout', (user) => {
        console.log('User logged out', user);
        setUser('');
    })

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor:'primary.main'}}>
                <Toolbar sx={{height:'80px'}} disableGutters>
                    <IconButton
                        disableRipple
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ml:0,mr:3, backgroundColor:'primary.light', borderRadius:0, height:'80px', width:'80px' }}
                    >
                        <AppsIcon fontSize={'large'} />
                    </IconButton>
                    <Typography variant="h5" fontWeight={100}>
                        Jamstack ToDo App
                    </Typography>
                    <Button as={Link} to={'/app'} color={'secondary'}>
                        App
                    </Button>
                    <Button
                        color={'secondary'}
                    onClick={()=>{
                        netlifyIdentity.open();
                    }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
