import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';

const {altethicalClient} = require('./proto/api_grpc_web_pb.js');
const searcher = new altethicalClient('https://altethical-sbpkzphfpq-uc.a.run.app/');
const {searchRequest} = require('./proto/api_pb.js');

export default function CustomizedTimeline(props) {
    const [message, setMessage] = useState([])

    function onDrop(pictureFiles, pictureDataURLs) {
        var u = new searchRequest();
        u.setUrl(pictureDataURLs.toString())
        console.log(pictureDataURLs.toString())
        searcher.searchImage(u, {}, function (err, response) {
            console.log(err, response)
            if (response !== null) {
                setMessage(response.getProductList())
            }
        })
    }

    return <div>
        <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
        />
        <br/>
        <div>
            <table align="center">
                <tr>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Score</th>
                </tr>
                {
                    message.map(a =>
                        <tr>
                            <td>{a.getTitle()}</td>
                            <td><a href={a.getUrl()}>{a.getUrl()}</a></td>
                            <td>{a.getScore()}</td>
                        </tr>
                    )
                }
            </table>

        </div>
    </div>;
}
