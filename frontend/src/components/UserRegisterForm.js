import React from 'react'
import PropTypes from 'prop-types'
import { TextField, withStyles, Button } from '@material-ui/core'
import { Redirect } from 'react-router'

const { registerRequest } = require('../proto/api_pb.js')
const { authenticateClient } = require('../proto/api_grpc_web_pb.js')
const auth = new authenticateClient('https://authenticate.epicportfol.io')

const styles = {
    form: {},
    field: {
        margin: '10px',
        background: 'white',
        width: '80%',
    },
    button: {
        margin: '5px',
        width: '80%',
    },
}

// Component to create form that registers users and redirects
// to profile page.
class UserRegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            username: '',
            email: '',
            name: '',
            preferredName: '',
            registered: false,
        }
        this.handleUname = this.handleUname.bind(this)
        this.handlepwd = this.handlepwd.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePreferredName = this.handlePreferredName.bind(this)
    }
    handleUname(event) {
        this.setState({
            username: event.target.value,
        })
    }
    handleName(event) {
        this.setState({
            name: event.target.value,
        })
    }
    handleEmail(event) {
        this.setState({
            email: event.target.value,
        })
    }
    handlePreferredName(event) {
        this.setState({
            preferredName: event.target.value,
        })
    }
    handlepwd(event) {
        this.setState({
            password: event.target.value,
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        var request = new registerRequest()
        request.setEmail(this.state.email)
        request.setPassword(this.state.password)
        request.setUsername(this.state.username)
        request.setFullname(this.state.name)
        request.setPreferredname(this.state.preferredName)

        var meta = {
            authorization:
                'Basic ' +
                window.btoa(this.state.username + ':' + this.state.password),
        }
        auth.register(request, meta, function (err, response) {
            err != null
                ? console.log(err.code, err.message)
                : localStorage.setItem('token', response.getJwt())
            console.log(localStorage)
        })
        this.setState({
            registered: true
        })
    }
    render() {
        const { classes } = this.props
        const { registered } = this.state
        var { username } = this.state
        username = "/u/"+username
        return (
            <div className="UserLoginForm">
                {(registered &&
                    <Redirect to={username}></Redirect>
                )}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.field}
                        id="name"
                        label="Full Name"
                        variant="outlined"
                        name="name"
                        type="text"
                        onChange={this.handleName}
                        value={this.state.name}
                        required
                    />
                    <TextField
                        className={classes.field}
                        id="preferredname"
                        label="Preferred Name"
                        variant="outlined"
                        name="preferredname"
                        type="text"
                        onChange={this.handlePreferredName}
                        value={this.state.preferredName}
                        required
                    />
                    <TextField
                        className={classes.field}
                        id="email"
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        onChange={this.handleEmail}
                        value={this.state.email}
                        required
                    />
                    <TextField
                        className={classes.field}
                        id="username"
                        label="Username"
                        variant="outlined"
                        name="username"
                        type="text"
                        onChange={this.handleUname}
                        value={this.state.username}
                        required
                    />
                    <TextField
                        className={classes.field}
                        id="password"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        onChange={this.handlepwd}
                        value={this.state.password}
                        required
                    />
                    <Button
                        className={classes.button}
                        type="submit"
                        name="Submit"
                        variant="contained"
                        color="secondary"
                    >
                        Register
                    </Button>
                </form>
            </div>
        )
    }
}

UserRegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserRegisterForm)
