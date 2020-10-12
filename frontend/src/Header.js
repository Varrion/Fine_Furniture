import React, {useContext, useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useHistory} from "react-router-dom";
import {EncodeUsernameFromStorage, GetUserDetails} from "./user/UserService";
import {authContext} from "./config/authentication";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import {GetManufacturerByAdmin} from "./manufacturer/ManufacturerService";

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
    const [shopId, setShopId] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const {setAuthData, auth} = useContext(authContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (auth && !auth.loading && auth.data) {
            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                .then(res => {
                    setLoggedUser(res.data);

                    GetManufacturerByAdmin(res.data.id)
                        .then(result => {
                            setShopId(result.data.id)
                        })
                        .catch(err => {
                            window.location.reload();
                        })
                })
                .catch(err => console.log(err))
        }
    }, [auth, shopId])

    const logoutUser = () => {
        setAuthData(null);
        setAnchorEl(null);
        history.push('/');
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography style={{cursor: "pointer"}} variant="h6" onClick={() => history.push("/")}>
                        Fine Furniture
                    </Typography>
                    <div>
                        {loggedUser
                            ?
                            <>
                                <Button color={"inherit"} aria-controls="fade-menu" aria-haspopup="true"
                                        onClick={handleClick}>
                                    {loggedUser.name}
                                </Button>
                                <Menu id="fade-menu"
                                      anchorEl={anchorEl}
                                      keepMounted
                                      open={open}
                                      onClose={handleClose}
                                      TransitionComponent={Fade}>
                                    <MenuItem component={Link} to={`/user/${loggedUser.username}`}
                                              onClick={handleClose}> Profile details </MenuItem>
                                    {
                                        loggedUser.isManufacturer &&
                                        <MenuItem component={Link} to={`/shop/${shopId}`}
                                                  onClick={handleClose}> My Shop </MenuItem>
                                    }
                                    <MenuItem component={Link} to={{
                                        pathname: "/admin-panel",
                                        state: {manufacturerAdmin: loggedUser.id}
                                    }}
                                              onClick={handleClose}> Shop panel </MenuItem>
                                    <MenuItem
                                        onClick={logoutUser}> Logout </MenuItem>
                                </Menu>
                            </>
                            :
                            <>
                                <Button component={Link} to={"/login"} color="inherit">Login</Button>
                                <Button component={Link} to={"/register"} color="inherit">Register</Button>
                            </>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;