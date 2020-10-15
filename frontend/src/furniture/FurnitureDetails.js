import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {BuyFurniture, DeleteFurniture, GetFurnitureDetails} from "./FurnitureService";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DefaultPicture from "../assets/images/furnitureDefault.jpg"
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddUpdateFurniture from "./AddUpdateFurniture";
import Box from "@material-ui/core/Box";
import EuroIcon from "@material-ui/icons/Euro";
import {authContext} from "../config/authentication";
import {EncodeUsernameFromStorage, GetUserDetails} from "../user/UserService";
import StripeCheckout from 'react-stripe-checkout';

const useStyles = makeStyles({
    dot: {
        height: "25px",
        width: "25px",
        borderRadius: "50%",
        marginRight: "5px",
        opacity: "0.7",
        display: "inline-block",
    },

    mutedText: {
        opacity: "0.5"
    },

    rightSide: {
        paddingLeft: "20px",
        position: "relative"
    },

    flexCenterDown: {
        position: "absolute",
        bottom: 0,
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    marginRight: {
        marginRight: "10px"
    },

    marginTop: {
        marginTop: "15px"
    },
});


function FurnitureDetails(props) {
    const classes = useStyles();

    const publishableStripeKey = 'pk_test_51HYubXBtQfShfifwPmcBtqrsmqDs8oOjtVTeWkLKCGBEEpDWBX0gEyoEqr8YE23IyCD48Zo8w5VsXJT4UaWKXLYo00GklkX3pb';
    const {auth} = useContext(authContext);
    const {furnitureId} = useParams();
    const history = useHistory();
    const [furniture, setFurniture] = useState(null);
    const [furnitureChanged, setFurnitureChanged] = useState(false);
    const [openFurnitureModal, setOpenFurnitureModal] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    let requestPayment = {
        email: null,
        token: '',
        price: 0,
    };

    useEffect(() => {
        GetFurnitureDetails(furnitureId)
            .then(res => {
                setFurniture(res.data);
            })

        if (auth && !auth.loading && auth.data) {
            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                .then(res => {
                    setLoggedUser(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [furnitureChanged, auth])

    const handleOpenFurnitureModal = () => {
        setOpenFurnitureModal(true);
    };

    const handleCloseFurnitureModal = () => {
        setOpenFurnitureModal(false);
        setFurnitureChanged(false);
    };

    const onDeleteFurniture = () => {
        DeleteFurniture(furniture.id)
            .then(() => {
                history.goBack();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const generateToken = token => {
        requestPayment = {
            email: loggedUser.email,
            token: token.id,
            price: furniture.price * 100,
        }
        BuyFurniture(requestPayment)
            .then(res => {
                alert("Succesfully bought this item")
            })
            .catch(err => {

            })
    }

    return (
        <>
            {furniture &&
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={3}>
                        <div>
                            <img
                                width={300}
                                height={300}
                                src={furniture.picture ? "data:image/jpeg;base64," + furniture.picture : DefaultPicture}
                                alt={"user picture"}/>
                        </div>
                    </Grid>
                    <Grid container item xs={9} direction={"column"} alignItems={"flex-start"}
                          className={classes.rightSide}>
                        <Typography variant={"h3"}>
                            {furniture.name}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.mutedText} gutterBottom>
                            <Box fontStyle={"italic"}>
                                -- {furniture.category.name}
                            </Box>
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom className={classes.marginTop}>
                            {furniture.description}
                        </Typography>

                        <Typography variant="subtitle1"
                                    gutterBottom> Price <EuroIcon fontSize={"inherit"}/> {furniture.price}
                        </Typography>

                        <Typography component={"p"}>
                            Available colors:
                        </Typography>

                        <Typography component={"div"}>
                            {furniture.colorSet
                            && furniture.colorSet.length > 0 && furniture.colorSet.map((color, key) =>
                                <div key={key} className={classes.dot} style={{backgroundColor: color}}/>
                            )}
                        </Typography>

                        <div className={classes.flexCenterDown}>
                            {loggedUser && <>
                                {loggedUser.isManufacturer
                                    ? <>
                                        <Button onClick={handleOpenFurnitureModal} color={"primary"}
                                                variant={"outlined"}
                                                className={classes.marginRight}>
                                            Edit Furniture </Button>
                                        <Button onClick={onDeleteFurniture} color={"secondary"} variant={"outlined"}>
                                            Delete Furniture
                                        </Button>
                                    </>
                                    : <>
                                        <StripeCheckout
                                            amount={furniture.price * 100}
                                            email={loggedUser.email}
                                            description={`Total price to pay is ${furniture.price} EUR`}
                                            name={loggedUser.name}
                                            panelLabel={"Buy Furniture"}
                                            currency="EUR"
                                            label={"Buy Furniture"}
                                            stripeKey={publishableStripeKey}
                                            token={generateToken}
                                        />
                                    </>
                                }
                            </>}
                        </div>
                    </Grid>
                </Grid>

                {openFurnitureModal && <AddUpdateFurniture furniture={furniture} furnitureChanged={setFurnitureChanged}
                                                           manufacturerId={furniture.manufacturer.id}
                                                           open={openFurnitureModal}
                                                           handleClose={handleCloseFurnitureModal}/>}
            </Paper>
            }
        </>
    )
}

export default FurnitureDetails;