import React from 'react'
import './Modal.css'
import toggleDisplay from './toggleDisplay';
const { profilesClient } = require('../proto/api_grpc_web_pb.js');
const profiles = new profilesClient('https://profiles.epicportfol.io');
const { profileFromJson } = require('./../components/convertor.js');
export default function TimelineEditor(props) {

    //const updateUser = (user) => console.log(Object.assign(new profile(), yaml.safeLoad(user)));
    //update user needs to add | on the end, and reinsert back into the yamled file, and then upload

    //this updates the the text area with the profile data and allows you to edit it
    const meta = { authorization: 'Bearer ' + localStorage.getItem('token') }
    const emptyJob = {
        title: "JobTitle",
        company: "Company",
        description: "Description",
    }

    return (
        <div id="TimelineEditor" class="Modal">
            {props.profile.jobsList.map((job, i) =>
                <div>
                    <h2>Title</h2>
                    <input type="textbox" value={job.title}
                        onChange={e => props.setProfile({ ...props.profile, jobsList: props.profile.jobsList.map((v2, i2) => i === i2 ? { ...job, title: e.target.value } : v2) })}></input>
                    <button onClick={e => props.setProfile({ ...props.profile, jobsList: props.profile.jobsList.filter((v, index) => i !== index) })}>Remove This Job</button>
                    <h2>Company</h2><input type="textbox" value={job.company}
                        onChange={e => props.setProfile({ ...props.profile, jobsList: props.profile.jobsList.map((v2, i2) => i === i2 ? { ...job, company: e.target.value } : v2) })}></input>
                    <h2>Description</h2><input type="textbox" value={job.description}
                        onChange={e => props.setProfile({ ...props.profile, jobsList: props.profile.jobsList.map((v2, i2) => i === i2 ? { ...job, description: e.target.value } : v2) })}></input>
                </div>
            )}
            <button onClick={e => props.setProfile({ ...props.profile, jobsList: [...props.profile.jobsList, emptyJob] })}></button>
            <button onClick={() => { toggleDisplay('TimelineEditor'); profiles.updateuser(profileFromJson(props.profile), meta, function (err, response) { }); }}>Submit and Close</button>
        </div>
    )


}