import React from 'react';
import './App.css';
import Header from "./Header";
import Login from "./user/Login";
import Register from "./user/Register";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/topics">
                        <Register/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
