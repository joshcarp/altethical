import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    oppositeItem: {
        flex: 0.15,
        paddingRight: 10,
        paddingLeft: 0,
    },
    timelinePreviewGrid: {
        display: 'flex'
    },
    jobTitle: {
        textAlign: 'left'
    },
    jobLocation: {
        textAlign: 'right',
        flexGrow: 1
    },
    cardTitle: {
        margin: theme.spacing(1),
    }

}))

export default function CustomizedTimeline(props) {
    const classes = useStyles()
    const final = [];
    for (let user of props.profile.jobsList) {
        final.push(
            <TimelineItem>
                {/* LEFT SIDE DATES */}
                <TimelineOppositeContent className={classes.oppositeItem}>
                    <Typography variant="body2" color="textSecondary">
                        {user.dates}
                    </Typography>
                </TimelineOppositeContent>
                {/* TIMELINE SEPARATERS */}
                <TimelineSeparator>
                    <TimelineDot color="primary"></TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                {/* TIMELINE CONTENT */}
                <TimelineContent>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Grid container classname={classes.timelinePreviewGrid}>
                                <Grid item className={classes.jobTitle}>
                                    <Typography variant="body1">
                                        <strong>
                                            {user.title}
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.jobLocation}>
                                    <Typography variant="body1">
                                        <i>
                                            {user.company}
                                        </i>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </AccordionSummary>
                        <AccordionDetails>

                            <Typography variant="body2">
                                {user.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </TimelineContent>
            </TimelineItem>

        );
    }
    return (
        <div>
            <Typography variant="h5" align="center" className={classes.cardTitle}>
                <strong>
                    My History
                </strong>
            </Typography>

            <Timeline align="left" >
                {final}
            </Timeline>

        </div>
    )
}
