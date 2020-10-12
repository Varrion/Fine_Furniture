import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {EditUser} from "./UserService";

const useStyles = makeStyles((theme) => ({
    textFieldContainer: {
        marginBottom: "20px",
    },

    textField: {
        width: "500px"
    },

    dualFieldMarginBottom: {
        marginBottom: "10px",
    },

    dualFieldTextField: {
        width: "360px"
    },

    bottomMargin: {
        marginBottom: "10px"
    }
}));

function UpdateProfileModal(props) {
    const classes = useStyles();

    const [user, setUser] = useState({
        username: props.user.username ?? '',
        password: props.user.password ?? '',
        name: props.user.name ?? '',
        surname: props.user.surname ?? '',
        email: props.user.email ?? '',
        phoneNumber: props.user.phoneNumber ?? '',
        city: props.user.city ?? '',
        address: props.user.address ?? '',
        isManufacturer: props.user.isManufacturer ?? false
    });
    const [userPhoto, setUserPhoto] = useState(props.user?.picture);


    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("userPicture", userPhoto);

        EditUser(formData, props.user.id)
            .then(res => {
                props.profileUpdated(true);
                props.handleClose();
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setUserPhoto(file);
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>

                <DialogContent>
                    <Grid container spacing={1} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                        <Grid item xs={6} container justify={"flex-end"}>
                            <TextField id="input-with-icon-grid" label="Name" value={user.name}
                                       className={classes.dualFieldTextField}
                                       onChange={handleChange("name")}/>
                        </Grid>
                        <Grid item xs={6} container justify={"flex-start"}>
                            <TextField id="input-with-icon-grid" label="Surname" value={user.surname}
                                       className={classes.dualFieldTextField}
                                       onChange={handleChange("surname")}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end" className={classes.textFieldContainer}>
                        <Grid item>
                            <LockIcon/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Password" value={user.password}
                                       type={"password"}
                                       className={classes.textField}
                                       onChange={handleChange("password")} fullWidth/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end" className={classes.textFieldContainer}>
                        <Grid item>
                            <EmailIcon/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Email" value={user.email} type={"email"}
                                       className={classes.textField}
                                       onChange={handleChange("email")}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end" className={classes.textFieldContainer}>
                        <Grid item>
                            <PhoneIcon/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Phone" value={user.phoneNumber}
                                       className={classes.textField}
                                       onChange={handleChange("phoneNumber")}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                        <Grid item xs={6} container justify={"flex-end"}>
                            <TextField id="input-with-icon-grid" label="Address" value={user.address}
                                       className={classes.dualFieldTextField}
                                       onChange={handleChange("address")}/>
                        </Grid>
                        <Grid item xs={6} container justify={"flex-start"}>
                            <TextField id="input-with-icon-grid" label="City" value={user.city}
                                       className={classes.dualFieldTextField}
                                       onChange={handleChange("city")}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end" style={{marginTop: "20px"}}>
                        <Grid item>
                            <TextField id="input-with-icon-grid" placeholder={"Picture"} type={"file"}
                                       style={{width: "535px"}}
                                       onChange={handleDrop}/>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Edit Profile
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateProfileModal;