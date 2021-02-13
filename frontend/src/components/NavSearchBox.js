import React from "react";
import PropTypes from 'prop-types';
import { withStyles, InputBase, Paper } from '@material-ui/core';
import { Redirect } from 'react-router'


const styles = {
    form: {

    },
    field: {
        background: 'white',
        width: '80%',
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        minWidth: '30vmin',
        maxWidth: '30vmin'
    },
    input: {
        marginLeft: '10px',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
};

// Component to create text box that redirects to profile of desired user
// or to search results page of potential users.
class UserSearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isValid: true,
            fireRedirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleinput = this.handleinput.bind(this)
    }

    handleinput(event) {

        this.setState({
            username: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.setState({
            fireRedirect: true
        })
    }


    render() {
        const { fireRedirect } = this.state;
        var { username } = this.state;
        const { classes } = this.props;
        username = "/search?term=" + username

        if (fireRedirect) {
            return (
                <Redirect to={username}></Redirect>
            )
        }

        return (
            <div className="UserSearchBox">
                <Paper component="form" className={classes.root} elevation={0} onSubmit={this.handleSubmit}>
                    <InputBase
                        id="nav-user-search-field"
                        name="username"
                        type="search"
                        onChange={this.handleinput}
                        className={classes.input}
                        placeholder="User Search"
                        inputProps={{ 'aria-label': 'nav user search' }}
                    />
                </Paper>
            </div>
        );
    }
}

UserSearchBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSearchBox);
