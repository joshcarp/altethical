import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../App.css'
import Logo from '../assets/logo.svg'

import UserRegisterForm from '../components/UserRegisterForm'
import Nav from './Nav.js'

class RegisterPage extends Component {
    state = {
        showSideDrawer: false,
    }
    render() {
        return (
            <>
                <Nav />
                <div className="Homepage">
                    <img src={Logo} className="Homepage-logo" alt="logo" />
                    <Paper elevation={3}>
                        <h4>Register your Epic Portfolio</h4>
                        <UserRegisterForm />
                        <br />
                    </Paper>
                </div>
            </>
        )
    }
}

export default RegisterPage
