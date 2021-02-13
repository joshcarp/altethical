import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import '../App.css'
import { Link, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Nav from './Nav.js'
import LoadingScreen from '../components/LoadingScreen'
const { searchClient } = require('./../proto/api_grpc_web_pb.js')
const searcher = new searchClient('https://search.epicportfol.io')
const { searchRequest } = require('./../proto/api_pb.js')

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
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '80vmin',
        minWidth: '60vmin',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginTop: 40,
        marginBottom: 60,
    },
    card: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
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
    inline: {
        display: 'inline',
    },
}))

function useQuery() {
    return new URLSearchParams(useLocation().search)
}
export default function SearchPage() {
    const classes = useStyles()
    let query = useQuery()
    var term = query.get('term')
    var r = new searchRequest()
    r.setTerm(term)
    const [prof, setProfile] = useState(null)
    useEffect(() => {
        searcher.search(r, {}, function (err, response) {
            setProfile(response.toObject())
        })
    })
    if (prof == null) {
        return <LoadingScreen />
    }
    return (
        <>
            <Nav />
            <Grid container className="Homepage">
                {/* SEARCH PAPER CONTAINER */}
                <Grid
                    container
                    component={Paper}
                    className={classes.profile}
                    elevation={4}
                >
                    {/* SEARCH TERM TEXT */}
                    <Typography variant="h6">
                        Search Results for "{term}"
                    </Typography>
                    {/* SEARCH RESULTS */}
                    {prof.resultsList.map((user) => (
                        <List className={classes.card}>
                            <Divider variant="inset" component="li" />
                            <ListItem
                                alignItems="flex-start"
                                button
                                component={Link}
                                to={'/u/' + user.username}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.fullName}
                                        src={user.picture}
                                        className={classes.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.fullName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                <i>
                                                    {"@" + user.username}
                                                </i>
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}
