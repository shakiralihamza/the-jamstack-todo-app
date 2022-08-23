import React from 'react';
import Typography from "@mui/material/Typography";
import {Grid, Stack} from "@mui/material";
import {Button} from "gatsby-theme-material-ui";
import netlifyIdentity from "netlify-identity-widget";

function Default() {
    return (
        <Grid container justifyContent={'center'} alignContent={'center'} direction={'row'}
              sx={{width: '100%', height: '400px'}} spacing={3}>
            <Grid item xs={12}>
                <Typography variant={'h2'} fontWeight={100} textAlign={'center'}>
                    Just One Step Away!
                </Typography>
            </Grid>
            <Grid item>
                <Stack spacing={1}>
                    <Button
                        sx={{
                            borderRadius: '20px',
                            padding: '5px 20px',
                            backgroundColor: 'primary.light',
                            '&:hover': {
                                backgroundColor: 'primary.main'
                            },
                            textTransform: 'none',
                            fontWeight: '200',
                        }}
                        onClick={() => {
                            netlifyIdentity.open('signup');
                        }}
                        disableRipple variant={'contained'}
                    >
                        Signup to Get Started
                    </Button>
                    <Button
                        variant={'text'}
                        sx={{
                            color: 'primary.light',
                            borderRadius: '20px',
                            padding: '5px 20px',
                            textTransform: 'none',
                            fontWeight: '400',
                        }}
                        onClick={() => {
                            netlifyIdentity.open('login');
                        }}
                        disableRipple
                    >
                        Already registered? Sign in
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Default;
