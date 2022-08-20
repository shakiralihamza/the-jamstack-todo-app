import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';

export default function Header() {
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
                        Serverless CRUD App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
