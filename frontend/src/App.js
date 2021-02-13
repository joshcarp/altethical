import Homepage from './containers/Homepage'
import UserProfile from './containers/UserProfile'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RegisterPage from './containers/RegisterPage'
import React, { useEffect } from 'react'
import SearchPage from "./containers/SearchPage";
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { green, indigo, red } from '@material-ui/core/colors'

export default function App() {
    useEffect(() => {
        document.title = "Epic Portfolio"
    }, []);

    const theme = createMuiTheme({
        palette: {
            primary: indigo,
            secondary: indigo,
            error: red,
            success: green,
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/register">
                        <RegisterPage />
                    </Route>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route path="/u/:username/" children={<UserProfile />}>
                    </Route>

                    <Route path="/search" children={<SearchPage />}>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
