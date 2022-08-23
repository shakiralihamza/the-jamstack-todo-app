import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppsIcon from '@mui/icons-material/Apps';
import Button from "@mui/material/Button";
import netlifyIdentity from 'netlify-identity-widget';
import {useEffect} from "react";
import MyContext from "../context/MyContext";
import {Grid, Stack} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {Button as MuiButton, IconButton} from "gatsby-theme-material-ui";

export default function Header() {
    const {user, setUser} = React.useContext(MyContext);

    useEffect(() => {
        netlifyIdentity.init();
    });
    netlifyIdentity.on('login', (user) => {
        console.log('User logged in');
        netlifyIdentity.close();
        setUser(user);
    });
    netlifyIdentity.on('logout', () => {
        console.log('User logged out');
        setUser('');
    })
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: 'primary.main'}}>
                <Toolbar sx={{height: '80px'}} disableGutters>
                    <IconButton
                        to="/"
                        disableRipple
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            ml: 0,
                            mr: 3,
                            backgroundColor: 'primary.light',
                            borderRadius: 0,
                            height: '80px',
                            width: '80px'
                        }}
                    >
                        <AppsIcon fontSize={'large'}/>
                    </IconButton>
                    <Typography variant="h5" fontWeight={100} sx={{flexGrow: 1}}>
                        Jamstack ToDo App
                    </Typography>

                    <Grid
                        container
                        sx={{width: '180px', height: '100%'}}
                        direction={'row'}
                    >
                        <Grid item xs={12} sx={{size: 12, mt: 1}}>
                            {user && user.user_metadata && `Hey, ${user.user_metadata.full_name}`}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'row'} sx={{mr: 2}}>
                                <MuiButton to={'/app'} color={'secondary'}
                                           sx={{color: 'white', mr: 2}}
                                           disableRipple
                                           size={'small'}
                                >
                                    Dashboard
                                </MuiButton>
                                {
                                    user === '' ?
                                        <Button
                                            size={'small'}

                                            sx={{color: 'white'}}
                                            disableRipple
                                            endIcon={<LoginIcon/>}
                                            onClick={() => {
                                                netlifyIdentity.open();
                                            }}>
                                            Login
                                        </Button>
                                        :
                                        <Button
                                            size={'small'}
                                            sx={{color: 'white'}}
                                            disableRipple
                                            endIcon={<LoginIcon/>}
                                            onClick={() => {
                                                netlifyIdentity.logout();
                                            }}>
                                            Logout
                                        </Button>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
