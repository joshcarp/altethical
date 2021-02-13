import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import Timeline from '../components/Timeline'
import LoadingScreen from '../components/LoadingScreen'
import { makeStyles, Grid, Paper, Button } from '@material-ui/core'
import UserInfoCard from '../components/UserInfoCard'
import ProfileEditor from '../components/Editor'
import Nav from '../containers/Nav'
// import BioEditModal from '../components/BioEditModal'
// import PopModal from '../components/PopModal'
// import TimelineEditor from '../components/TimelineEditor'

const { profilesClient, authenticateClient, verifyRequest } = require('./../proto/api_grpc_web_pb.js')
const profiles = new profilesClient('https://profiles.epicportfol.io')
const authenticate = new authenticateClient('https://authenticate.epicportfol.io')
const { getuserRequest } = require('./../proto/api_pb.js')

export default function UserProfile(props) {
    const classes = useStyles()
    let { username } = useParams()

    // const [comp, setComp] = useState(null)
    const [editState, setEditState] = useState(false)
    const [prof, setProfile] = useState(null)
    const [authed, setAuthed] = useState(false)

    // Fetch profile
    useEffect(() => {
        var req = new getuserRequest()
        req.setUserid(username)
        profiles.getuser(req, {}, function (err, response) {
            // console.log("ERR: %o", err)
            // console.log("PROFILE: %o", response.toObject())
            if (err == null) {
                setProfile(response.toObject())
            }
        })
    }, [username])

    // Check authorisation
    useEffect(() => {
        var req = new verifyRequest()
        req.setUsername(username)
        const meta = { authorization: 'Bearer ' + localStorage.getItem('token') }
        authenticate.verify(req, meta, function (err, response) {
            setAuthed(response.getVerified())
            // TESTING PURPOSES, REMOVE TO ENABLE AUTH
            // setAuthed(true)
        })

    })

    // Allow ?edit=true to trigger edit state
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        if (params.get('edit') === 'true') {
            setEditState(true)
        }
    }, [])

    const toggleEdit = () => {
        if (editState) {
            setEditState(false)
        }
        else {
            setEditState(true)
        }
    }

    const renderEditButton = (
        <>
            {
                authed && !editState &&
                <Button
                    variant='outlined'
                    color='primary'
                    style={{ float: "right" }}
                    onClick={toggleEdit}
                >
                    Edit Content
                </Button>
            }
            {
                authed && editState &&
                <Button
                    variant='outlined'
                    color='secondary'
                    style={{ float: "right" }}
                    onClick={toggleEdit}
                >
                    Save Content
                </Button>
            }
        </>
    )

    const richEditorBox = (
        <>
            <ProfileEditor profile={prof} />
        </>
    )


    // If profile is not retrieved, show loading screen
    if (prof == null) {
        return (
            <LoadingScreen />
        )
    }


    // console.log("AUTHED: %o", authed)
    // console.log("RICH CONTENT: %o", prof.content)
    return (
        <>
            <Nav />

            <Grid container className={classes.root}>
                <Grid container
                    component={Paper}
                    className={classes.profile}
                    elevation={4}
                >
                    {/* <BioEditModal profile={prof}/>
                        <TimelineEditor profile={prof}/>
                        <button onClick={() => PopModal("bio")}>Edit Bio</button>
                        <button onClick={() => PopModal("timeline")}>Edit Timeline</button> */}

                    <Grid item className={classes.card}>
                        <UserInfoCard profile={prof} setProfile={setProfile} />
                    </Grid>
                    <Grid item className={classes.card}>
                        {renderEditButton}
                        {
                            editState
                                ? richEditorBox
                                : <div className={classes.richContent} dangerouslySetInnerHTML={{ __html: prof.content }} />
                        }
                    </Grid>
                </Grid>
                <Grid className={classes.footer} />
            </Grid>
        </>
    )
}

// CSS Theming
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '93.3vmin',
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
        alignContent: 'flex-start',
        justifyContent: 'center',
        maxWidth: '80vmin',
        minWidth: '60vmin',
        marginTop: 40,
        marginBottom: 60,
    },
    richContent: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '95%',
        justifyContent: 'left',
    },
    card: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0),
        width: '100%',
        justifyContent: 'left',
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
