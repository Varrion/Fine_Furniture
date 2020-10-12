import React from 'react';
import './App.css';
import Header from "./Header";
import Login from "./user/Login";
import Register from "./user/Register";
import Home from "./Home";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Container} from "@material-ui/core";
import FurnitureDetails from "./furniture/FurnitureDetails";
import CategoryDetails from "./furniture/category/CategoryDetails";
import AddUpdateManufacturerDetails from "./manufacturer/AddUpdateManufacturerDetails";
import Profile from "./user/Profile";
import ManufacturerDetails from "./manufacturer/ManufacturerDetails";
import PrivateRoute from "./config/PrivateRoute";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Container fixed className="App" style={{marginTop: "30px"}}>
                    <Switch>
                        <Route path="/furniture/:id" component={FurnitureDetails} exact/>
                        <Route path="/login" component={Login} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/category/:categoryId" component={CategoryDetails} exact/>
                        <Route path={"/user/:username"} component={Profile} exact/>
                        <PrivateRoute path={"/admin-panel"} component={AddUpdateManufacturerDetails} exact />
                        <Route path={"/shop/:shopId"} component={ManufacturerDetails} exact/>
                        <Route path="*">
                            <Redirect to={"/"}/>
                            <Home/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </>
    );
}

export default App;
