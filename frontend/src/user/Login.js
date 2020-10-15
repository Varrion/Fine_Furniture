import React, {useContext, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {AccountCircle} from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import {Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {BasicAuthToken, LoginUser} from "./UserService";
import {useHistory} from "react-router-dom"
import {authContext} from "../config/authentication";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },

    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },

    textField: {
        marginBottom: "20px",
        width: "50%"
    },

    dualFieldMarginBottom: {
        marginBottom: "10px",
    },

    bottomMargin: {
        marginBottom: "10px"
    }
}));


function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const {setAuthData} = useContext(authContext);

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        LoginUser(user)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password), res.data.isManufacturer, res.data.id)
                history.push("/");
            })
            .catch(err => {
                alert(err.message);
            })
    };


    return (
        <Paper className={classes.margin} elevation={3}>
            <h1> Login </h1>
            <form onSubmit={handleSubmit} className={classes.flexCenter}>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Username" onChange={handleChange("username")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <LockIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Password" type={"password"}
                                   onChange={handleChange("password")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>
                <Button className={classes.bottomMargin} type="submit" variant="outlined"
                        color="primary">Submit</Button>
            </form>
        </Paper>
    )
}

export default Login;