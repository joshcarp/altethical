import React, { useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Home } from '@material-ui/icons'
import NavSearchBox from '../components/NavSearchBox'
import LogoutButton from '../components/LogoutButton'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'flex',
    },
}))

export default function PrimarySearchAppBar() {
    const classes = useStyles()

    // Check authentication
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setIsLoggedIn(false)
        }
        else { setIsLoggedIn(true) }
        console.log("TOKEN: %o", localStorage.getItem('token'))
        console.log("LOGIN STATE: %o", isLoggedIn)
    }, [isLoggedIn])

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        href="/"
                    >
                        <Home fontSize="large" />
                    </IconButton>

                    <NavSearchBox />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/* MAKE THIS BUTTON WORK AT SOME POINT */}
                        {
                            isLoggedIn
                                ? (
                                    <>
                                        <LogoutButton setIsLoggedIn={setIsLoggedIn} />
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            href={"/u/" + localStorage.getItem("currentUser")}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </>
                                )
                                : (<></>)
                        }

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
