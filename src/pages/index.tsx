import * as React from "react"
import type {HeadFC} from "gatsby"
import Layout from "../components/layout";
import {Grid, Stack} from "@mui/material";
import {Button} from "gatsby-theme-material-ui";
import Typography from "@mui/material/Typography";

const IndexPage = () => {
    return (
        <Layout>
            <Grid container justifyContent={'center'} alignContent={'center'} direction={'row'}
                  sx={{width: '100%', height: '400px', px: {xs: 3, md: 0}}}>
                <Stack spacing={3}>
                    <Typography variant={'h2'} fontWeight={100} textAlign={'center'} sx={{
                        fontSize: {xs: '2.5rem', sm: '3.0', md: '3.8rem'},
                    }}>
                        Accomplish more every day
                    </Typography>
                    <Typography variant={'body1'} fontWeight={100} textAlign={'center'}>
                        Capture ideas, organize life, and do something creative everyday.
                    </Typography>
                    <Button
                        to={'/app'}
                        sx={{
                            borderRadius: '20px',
                            padding: '5px 20px',
                            backgroundColor: 'primary.light',
                            '&:hover': {
                                backgroundColor: 'primary.main'
                            },
                            textTransform: 'none',
                            fontWeight: '400',
                        }}
                        disableRipple variant={'contained'}
                    >
                        Get Started - It's Free!
                    </Button>
                </Stack>
                {/*   <Grid item xs={12}>
                    <Typography variant={'h2'} fontWeight={100} textAlign={'center'}>Accomplish more every
                        day</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'body1'} fontWeight={100} textAlign={'center'}>
                        Capture ideas, organize life, and do something creative everyday.
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        to={'/app'}
                        sx={{
                            borderRadius: '20px',
                            padding: '5px 20px',
                            backgroundColor: 'primary.light',
                            '&:hover': {
                                backgroundColor: 'primary.main'
                            },
                            textTransform: 'none',
                            fontWeight: '400',
                        }}
                        disableRipple variant={'contained'}
                    >
                        Get Started - It's Free!
                    </Button>
                </Grid>*/}
            </Grid>
        </Layout>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
