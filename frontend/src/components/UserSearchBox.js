import React from "react";
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import { Redirect } from 'react-router'


const styles = {
    form: {

    },
    field: {
        background: 'white',
        width: '80%',
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
        return (
            <div className="UserSearchBox">
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        className={classes.field}
                        id="user-search-field"
                        label="Looking for someone?"
                        variant="outlined"
                        name="username"
                        type="search"
                        onChange={this.handleinput}
                    />
                </form>
                {fireRedirect && (
                    <Redirect to={username}></Redirect>
                )}
            </div>
        );
    }
}

UserSearchBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSearchBox);
