import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GetManufacturerDetails} from "./ManufacturerService";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProfilePicture from "../assets/images/profile.png";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";

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

    rightContent: {
        width: "inherit",
        textAlign: "right"
    },

    mutedText: {
        opacity: "0.5"
    },

    marginRight: {
        marginRight: "10px"
    },

    marginTop: {
        marginTop: "20px"
    },

    flexDisplay: {
        display: "flex"
    },
}));


function ManufacturerDetails(props) {
    const classes = useStyles();
    const {shopId} = useParams();
    const [manufacturer, setManufacturerDetails] = useState(null);

    useEffect(() => {
        GetManufacturerDetails(shopId)
            .then(res => {
                setManufacturerDetails(res.data);
            })
    }, [])

    return (
        <>
            {manufacturer &&
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={3} className={classes.flexDisplay}>
                        <div className={classes.verticalLine}>
                            <img
                                width={300}
                                height={300}
                                src={manufacturer.picture ? "data:image/jpeg;base64," + manufacturer.picture : ProfilePicture}
                                alt={"user picture"}/>
                        </div>
                    </Grid>
                    <Grid container item xs={9} direction={"column"} alignItems={"flex-start"}
                          className={classes.rightSide}>

                        <Typography variant={"h3"} className={classes.centeredContent}>
                            Shop Details
                        </Typography>
                        <Typography variant="h4">{manufacturer.name}</Typography>
                        <Typography variant="subtitle1" className={classes.mutedText}
                                    gutterBottom>by {manufacturer.manufacturerAdmin.name} {manufacturer.manufacturerAdmin.surname}</Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {manufacturer.description}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.marginTop}
                                    gutterBottom><HomeIcon/> {manufacturer.address}</Typography>
                        <Typography variant="subtitle1" gutterBottom><LocationCityIcon/> {manufacturer.city}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom><PhoneIcon/> {manufacturer.phoneNumber}
                        </Typography>

                        <div className={classes.rightContent}>
                            <Button component={Link} to={{
                                pathname: "/admin-panel",
                                state: {manufacturerAdmin: manufacturer.manufacturerAdmin.id}
                            }}>
                                Go to admin panel </Button>
                        </div>
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    <Typography variant="h4">Test</Typography>
                </Grid>
            </Paper>
            }
        </>
    )
}

export default ManufacturerDetails;