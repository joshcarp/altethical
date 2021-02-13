
import React from 'react'
import Logo from '../assets/logo.svg'
import { makeStyles, Grid, Paper, Backdrop, CircularProgress, Box } from '@material-ui/core'
import Nav from '../containers/Nav'

export default function LoadingScreen() {
    const classes = useStyles()

    return (
        <>
            <Backdrop className={classes.backdrop} open>
                <Box position="relative" display="inline-flex">
                    <CircularProgress color="inherit" size='20vmin' />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img src={Logo} style={{ height: "10vmin" }} alt="logo" />
                    </Box>
                </Box>
            </Backdrop>

            <Nav />
            <Grid container className={classes.root}>
                <Grid container
                    component={Paper}
                    className={classes.profile}
                    elevation={4}>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgb(50, 50, 50)',
        backgroundImage: 'url("/home-bg.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    },
    profile: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'left',
        justifyContent: 'center',
        maxWidth: '80vmin',
        minWidth: '60vmin',
        minHeight: '83vmin',
        marginTop: 40,
        marginBottom: 60,
    },
    card: {
        margin: theme.spacing(2),
        width: '100%',
        justifyContent: 'center',
    },
    paper: {
        height: 200,
        width: 200,
    },
    footer: {
        height: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))