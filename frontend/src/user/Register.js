import React, {useState} from "react";
import {AccountCircle} from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {Button, Hidden} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

    const initialUser = {
        username: '',
        password: '',
        name: '',
        surname: '',
        address: '',
        city: '',
        email: '',
        isSeller: false
    }

    const [user, setUser] = useState(initialUser);

    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        if (name !== "isSeller") {
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
        formData.append("customerDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("customerPicture", userPhoto);
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
                        <TextField id="input-with-icon-grid" label="Password" onChange={handleChange("password")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <EmailIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Email" onChange={handleChange("email")}
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

                <Grid container spacing={1} justify={"flex-start"}>
                    <Grid item md={3} implementation="css" smDown component={Hidden} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={user.isSeller}
                                onChange={handleChange('isSeller')}
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