import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "brown",
        '& div': {
            display: "flex",
            justifyContent: "space-between"
        }
    }
}));


function Header(props) {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" onClick={() => history.push("/")}>
                        Fine Furniture
                    </Typography>
                    <div>
                        <Button component={Link} to={"/login"} color="inherit">Login</Button>
                        <Button component={Link} to={"/register"} color="inherit">Register</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;