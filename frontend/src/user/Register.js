import React, {useContext, useState} from "react";
import {AccountCircle} from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Grid from "@material-ui/core/Grid";
import PhoneIcon from '@material-ui/icons/Phone';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {Button, Hidden} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {BasicAuthToken, RegisterUser} from "./UserService";
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

function Register(props) {
    const classes = useStyles();
    const history = useHistory();
    const { setAuthData } = useContext(authContext);

    const initialUser = {
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        city: '',
        address: '',
        isManufacturer: false,
        picture: null
    }

    const [user, setUser] = useState(initialUser);
    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        if (name !== "isManufacturer") {
            setUser({...user, [name]: event.target.value});
        } else {
            setUser({...user, [name]: event.target.checked});
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("userPicture", userPhoto);

        RegisterUser(formData)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password), res.data.isManufacturer, res.data.id)
                if (res.data.isManufacturer) {
                    history.push("/admin-panel", {manufacturerAdmin: res.data.id})
                } else {
                    history.push(`user/${res.data.username}`)
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <Paper className={classes.margin} elevation={3}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className={classes.flexCenter}>

                <Grid container spacing={3} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                    <Grid item xs={6} container justify={"flex-end"}>
                        <TextField id="input-with-icon-grid" label="Name" onChange={handleChange("name")}
                                   style={{width: '280px'}}/>
                    </Grid>
                    <Grid item xs={6} container justify={"flex-start"}>
                        <TextField id="input-with-icon-grid" label="Surname" onChange={handleChange("surname")}
                                   style={{width: '290px'}}/>
                    </Grid>
                </Grid>

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

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <EmailIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Email" type={"email"}
                                   onChange={handleChange("email")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <PhoneIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Phone" onChange={handleChange("phoneNumber")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                    <Grid item xs={6} container justify={"flex-end"}>
                        <TextField id="input-with-icon-grid" label="Address" onChange={handleChange("address")}
                                   style={{width: '280px'}}/>
                    </Grid>
                    <Grid item xs={6} container justify={"flex-start"}>
                        <TextField id="input-with-icon-grid" label="City" onChange={handleChange("city")}
                                   style={{width: '290px'}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <TextField id="input-with-icon-grid" placeholder={"Picture"} type={"file"} onChange={handleDrop}
                                   style={{width: "601px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} justify={"flex-start"}>
                    <Grid item md={3} implementation="css" smDown component={Hidden}/>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={user.isManufacturer}
                                onChange={handleChange('isManufacturer')}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Are you employer of Fine Furniture"
                    />
                </Grid>

                <Button className={classes.bottomMargin} type="submit" variant="outlined"
                        color="primary">Submit</Button>
            </form>
        </Paper>
    )
}

export default Register;