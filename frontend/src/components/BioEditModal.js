import React from 'react'
import './Modal.css'

import toggleDisplay from './toggleDisplay';
const { profilesClient } = require('../proto/api_grpc_web_pb.js');
const profiles = new profilesClient('https://profiles.epicportfol.io');
const { profileFromJson } = require('./../components/convertor.js');

export default function BioEditModal(props) {

    //const updateUser = (user) => console.log(Object.assign(new profile(), yaml.safeLoad(user)));
    //update user needs to add | on the end, and reinsert back into the yamled file, and then upload

    //this updates the the text area with the profile data and allows you to edit it
    const meta = { authorization: 'Bearer ' + localStorage.getItem('token') }

    return (
        <div id="BioEditModal" class="Modal">
            <div id="modal-title">Edit your profile</div>
            <h2>Picture URL</h2>
            <br />
            <input type="textbox" value={props.profile.picture} onChange={e => props.setProfile({ ...props.profile, picture: e.target.value })
            }></input>
            <br />
            <h2>Personal Bio</h2>
            <input type="textbox" value={props.profile.bio} onChange={e => props.setProfile({ ...props.profile, bio: e.target.value })
            }></input>

            <br />
            <button onClick={() => { toggleDisplay('BioEditModal'); profiles.updateuser(profileFromJson(props.profile), meta, function (err, response) { }); }}>Submit and Close</button>s


        </div>
    )
}