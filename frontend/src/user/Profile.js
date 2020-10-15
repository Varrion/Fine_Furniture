import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {DeleteUser, EncodeUsernameFromStorage, GetUserDetails} from "./UserService";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProfilePicture from "../assets/images/profile.png"
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import makeStyles from "@material-ui/core/styles/makeStyles";
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import UpdateProfileModal from "./UpdateProfileModal";
import {authContext} from "../config/authentication";

const useStyles = makeStyles((theme) => ({
    verticalLine: {
        borderRight: "2px solid gray",
        padding: "15px"
    },

    rightSide: {
        paddingLeft: "40px"
    },

    centeredContent: {
        width: "inherit",
        textAlign: "center",
        marginBottom: "25px"
    },

    mutedText: {
        opacity: "0.5"
    },

    marginRight: {
        marginRight: "10px"
    },

    flexDisplay: {
        display: "flex"
    },

    image: {
        borderRadius: "150px",
        marginTop: "20px"
    }
}));

function Profile(props) {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const {auth, setAuthData} = useContext(authContext);
    let {username} = useParams();

    useEffect(() => {
        if (profileUpdated) {
            window.location.reload();
        }

        if (auth && !auth.loading && auth.data) {
            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                .then(res => {
                    setLoggedUser(res.data);
                })
                .catch(err => console.log(err))
        }
        GetUserDetails(username)
            .then(res => {
                setUser(res.data);
            })

    }, [auth, profileUpdated])

    const handleOpenProfileModal = () => {
        setOpenProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
        setProfileUpdated(false);
    };

    const onDeleteProfile = userId => event => {
        event.preventDefault();

        DeleteUser(userId)
            .then(() => {
                setAuthData(null);
                history.push("/");
                window.location.reload();
            })
    }

    if (user) {
        return (
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={3} className={classes.flexDisplay}>
                        <div className={classes.verticalLine}>
                            <img
                                className={classes.image}
                                width={300}
                                height={300}
                                src={user.picture ? "data:image/jpeg;base64," + user.picture : ProfilePicture}
                                alt={"user picture"}/>
                        </div>
                    </Grid>
                    <Grid container item xs={9} direction={"column"} alignItems={"flex-start"}
                          className={classes.rightSide}>

                        <Typography variant={"h3"} className={classes.centeredContent}>
                            Profile Details
                        </Typography>
                        <Typography variant="h4">{user.name} {user.surname}</Typography>
                        <Typography variant="subtitle1" gutterBottom
                                    className={classes.mutedText}> as {user.username}</Typography>
                        <Typography variant="subtitle1" gutterBottom><EmailIcon/>
                            <a href={"mailto:" + user.email}> {user.email} </a></Typography>
                        <Typography variant="subtitle1" gutterBottom><HomeIcon/> {user.address}</Typography>
                        <Typography variant="subtitle1" gutterBottom><LocationCityIcon/> {user.city}</Typography>
                        <Typography variant="subtitle1" gutterBottom><PhoneIcon/> {user.phoneNumber}</Typography>

                        {loggedUser && loggedUser.username === user.username
                        && <div className={classes.centeredContent}>
                            <Button variant={"outlined"} color={"primary"} className={classes.marginRight}
                                    onClick={handleOpenProfileModal}>
                                Edit Profile
                            </Button>
                            <Button variant={"outlined"} color={"secondary"} onClick={onDeleteProfile(user.id)}>Delete
                                Profile</Button>
                        </div>}
                    </Grid>
                </Grid>
                {openProfileModal
                && <UpdateProfileModal user={user} profileUpdated={setProfileUpdated} open={openProfileModal}
                                       handleClose={handleCloseProfileModal}/>}
            </Paper>
        )
    } else
        return (
            <div>
                There is no such user
            </div>
        )
}

export default Profile;