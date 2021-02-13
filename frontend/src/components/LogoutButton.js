import React from 'react'
import { Button, makeStyles } from "@material-ui/core"
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.7),
        height: "80%",
    }
}))

export default function LogoutButton(props) {
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
        props.setIsLoggedIn(false)
        console.log(localStorage.getItem("token"))

        // Return to home page
        history.push("/")
    }

    const classes = useStyles();

    return (
        <>
            <Button className={classes.root}
                color="secondary"
                variant="contained"
                onClick={logout}
            >
                Logout
            </Button>
        </>
    )
}