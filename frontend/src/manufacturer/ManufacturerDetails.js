import React, {useContext, useEffect, useState} from "react";
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
import {GetFurnitureByManufacturer} from "../furniture/FurnitureService";
import AddUpdateFurniture from "../furniture/AddUpdateFurniture";
import CardItem from "../shared/CardItem";
import {authContext} from "../config/authentication";
import {EncodeUsernameFromStorage, GetUserDetails} from "../user/UserService";

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

    marginDown: {
        marginDown: "10px"
    },

    flexDisplay: {
        display: "flex"
    },

    grid: {
        padding: "10px"
    }
}));

function ManufacturerDetails(props) {
    const classes = useStyles();
    const {shopId} = useParams();
    const [manufacturer, setManufacturerDetails] = useState(null);
    const [shopFurniture, setShopFurniture] = useState(null);
    const [furnitureChanged, setFurnitureChanged] = useState(false);
    const [openFurnitureModal, setOpenFurnitureModal] = useState(false);
    const {auth} = useContext(authContext);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {

        if (auth && !auth.loading && auth.data) {
            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                .then(res => {
                    setLoggedUser(res.data);
                })
                .catch(err => console.log(err))
        }

        GetManufacturerDetails(shopId)
            .then(res => {
                setManufacturerDetails(res.data);

                GetFurnitureByManufacturer(res.data.id)
                    .then(res => {
                        setShopFurniture(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }, [auth, furnitureChanged])

    const handleOpenFurnitureModal = () => {
        setOpenFurnitureModal(true);
    };

    const handleCloseFurnitureModal = () => {
        setOpenFurnitureModal(false);
        setFurnitureChanged(false);
    };

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

                        {loggedUser && loggedUser.username === manufacturer.manufacturerAdmin.username &&
                        <div className={classes.rightContent}>
                            <Button component={Link} to={{
                                pathname: "/admin-panel",
                                state: {manufacturerAdmin: manufacturer.manufacturerAdmin.id}
                            }}>
                                Go to admin panel </Button>
                            <Button onClick={handleOpenFurnitureModal}>
                                Add Furniture
                            </Button>
                        </div>
                        }
                    </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={3} direction={"column"} alignItems={"flex-start"}
                      className={classes.marginDown}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} gutterBottom>
                            {shopFurniture && shopFurniture.length > 0 ? "Furniture from this shop" : "There is no furniture for this shop yet"}
                        </Typography>
                        <Grid container>
                            {shopFurniture && shopFurniture.length > 0 && shopFurniture.map(furniture =>
                                <Grid item xs={4} key={furniture.id}>
                                    <CardItem
                                        isShop={false}
                                        id={furniture.id}
                                        title={furniture.name}
                                        description={furniture.description}
                                        category={furniture.category.name}
                                        price={furniture.price}
                                        image={furniture.picture}/>
                                </Grid>)}
                        </Grid>
                    </Grid>
                </Grid>
                {openFurnitureModal &&
                <AddUpdateFurniture furnitureChanged={setFurnitureChanged} manufacturerId={manufacturer.id}
                                    open={openFurnitureModal}
                                    handleClose={handleCloseFurnitureModal}/>}
            </Paper>
            }
        </>
    )
}

export default ManufacturerDetails;