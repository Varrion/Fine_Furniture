import React from 'react';
import './App.css';
import Header from "./Header";
import Login from "./user/Login";
import Register from "./user/Register";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Box, Container} from "@material-ui/core";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Container fixed className="App" style={{marginTop: "30px"}}>
                    <Switch>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </>
    );
}

export default App;
