
import '../App.css';
import { useState } from 'react'
const { loginRequest } = require('../proto/api_pb.js');
const { authenticateClient } = require('../proto/api_grpc_web_pb.js');
const auth = new authenticateClient('https://authenticate.epicportfol.io');


function Login(uname, pwd) {
    const [message, setMessage] = useState("initial value")
    var request = new loginRequest();
    var meta = { 'authorization': "Basic " + window.btoa(uname + ':' + pwd) }
    auth.login(request, meta, function (err, response) {
        console.log(response.getJwt())
        setMessage(response.getJwt())
    })
    return message
}


export default Login;
