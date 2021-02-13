import React from "react";
import './ImageBoxStyle.css'
import ImageGallery from 'react-image-gallery';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    grid: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        marginBottom: theme.spacing(2),
    }

}));

export default function ImageBox(props) {
    const classes = useStyles();
    const images = [];
    for (let image of props.profile.artifactsList) {
        images.push(
            { original: image.link }
        )
    }
    return (
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item>
                    <Typography align="center" variant="h5" className={classes.title}>
                        <strong>My Showcase</strong>
                    </Typography>
                </Grid>

                <Grid item>
                    <ImageGallery
                        items={images}
                        showBullets={true}
                        showThumbnails={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                    />
                </Grid>
            </Grid>


        </div>
    )
};



