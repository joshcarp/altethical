import React from 'react'
import PropTypes from 'prop-types'
import { TextField, withStyles, Button, Snackbar } from '@material-ui/core'
import { Redirect } from 'react-router'
import Alert from '@material-ui/lab/Alert'

const { loginRequest } = require('../proto/api_pb.js')
const { authenticateClient } = require('../proto/api_grpc_web_pb.js')
const auth = new authenticateClient('https://authenticate.epicportfol.io')

const styles = {
    form: {},
    field: {
        margin: '5px',
        background: 'white',
        width: '80%',
    },
    button: {
        margin: '5px',
        width: '80%',
    },
}

// Component to create form that logs user into their profile and redirects
// to profile page.
class UserLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            username: '',
            loggedin: false,
            alertState: false,
        }


        this.handleUname = this.handleUname.bind(this)
        this.handlepwd = this.handlepwd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAlertOpen = this.handleAlertOpen.bind(this)
        this.handleAlertClose = this.handleAlertClose.bind(this)
    }

    handleAlertOpen() {
        this.setState({ alertState: true })
    }
    handleAlertClose() {
        this.setState({ alertState: false })
    }


    handleUname(event) {
        this.setState({
            username: event.target.value,
        })
    }
    handlepwd(event) {
        this.setState({
            password: event.target.value,
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        var request = new loginRequest()
        var meta = {
            authorization:
                'Basic ' +
                window.btoa(this.state.username + ':' + this.state.password),
        }
        auth.login(request, meta, (err, response) => {
            // Login failure
            if (err != null) {
                console.log(err.code, err.message)
                console.log(localStorage)
                this.setState({ alertState: true })
            }
            // Login success
            else {
                localStorage.setItem('token', response.getJwt())
                localStorage.setItem('currentUser', this.state.username)
                this.setState({ loggedin: true })
            }
        })

    }

    render() {
        const { classes } = this.props
        const { loggedin, alertState } = this.state
        var { username } = this.state
        username = "/u/" + username
        return (
            <div className="UserLoginForm">

                <Snackbar open={alertState} autoHideDuration={5000} onClose={this.handleAlertClose}>
                    <Alert elevation={6} variant="filled" severity="error">Incorrect username or password</Alert>
                </Snackbar>

                {(loggedin &&
                    <Redirect to={username}></Redirect>
                )}

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        className={classes.field}
                        id="username-field"
                        label="Username"
                        variant="outlined"
                        name="username"
                        type="text"
                        onChange={this.handleUname}
                    />

                    <TextField
                        className={classes.field}
                        id="password-field"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        onChange={this.handlepwd}
                    />

                    <br />
                    <Button
                        className={classes.button}
                        type="submit"
                        name="Submit"
                        variant="contained"
                        color="primary"
                    >
                        {' '}
                        Login{' '}
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        href="/register"
                    >
                        {' '}
                        Register{' '}
                    </Button>
                </form>
            </div>
        )
    }
}

UserLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserLoginForm)
