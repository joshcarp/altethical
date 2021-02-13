import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const { profilesClient } = require('../proto/api_grpc_web_pb.js');
const profiles = new profilesClient('https://profiles.epicportfol.io');
const { profileFromJson } = require('./../components/convertor.js');

export default function FormDialog(props) {

    const meta = { authorization: 'Bearer ' + localStorage.getItem('token') }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submit = () => {
        profiles.updateuser(profileFromJson(props.profile), meta, function (err, response) { });
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ float: "right" }}>
                Edit Info
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the fields below to make changes to your profile information.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="profile-full-name"
                        label="Full Name"
                        type="name"
                        value={props.profile.fullName}
                        onChange={e => props.setProfile({ ...props.profile, fullName: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="profile-email"
                        label="Profile Email"
                        type="text"
                        value={props.profile.email}
                        onChange={e => props.setProfile({ ...props.profile, email: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="profile-pic-url"
                        label="Profile Picture URL"
                        type="url"
                        value={props.profile.picture}
                        onChange={e => props.setProfile({ ...props.profile, picture: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="profile-bio-body"
                        label="Profile Bio Body"
                        type="text"
                        value={props.profile.bio}
                        onChange={e => props.setProfile({ ...props.profile, bio: e.target.value })}
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}