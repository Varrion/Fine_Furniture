import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {AccountCircle} from "@material-ui/icons";
import PhoneIcon from "@material-ui/icons/Phone";
import {Button} from "@material-ui/core";
import {
    AddManufacturer,
    DeleteManufacturerById,
    GetManufacturerByAdmin,
    UpdateManufacturer
} from "./ManufacturerService";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory, useLocation, useParams} from "react-router-dom"
import EmailIcon from "@material-ui/icons/Email";

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

function AddUpdateManufacturerDetails(props) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const {manufacturerAdmin} = useParams();
    const [shopId, setShopId] = useState(null);
    const initialManufacturer = {
        name: '',
        description: '',
        email: '',
        city: '',
        address: '',
        phoneNumber: '',
        manufacturerAdminId: location.state.manufacturerAdmin ?? manufacturerAdmin
    }

    const [manufacturer, setManufacturer] = useState(initialManufacturer);
    const [manufacturerPhoto, setManufacturerPhoto] = useState(null);

    useEffect(() => {
        GetManufacturerByAdmin(location.state.manufacturerAdmin)
            .then(res => {
                setManufacturer({
                    name: res.data.name,
                    description: res.data.description,
                    email: res.data.email,
                    city: res.data.city,
                    address: res.data.address,
                    phoneNumber: res.data.phoneNumber,
                    manufacturerAdminId: location.state.manufacturerAdmin
                });
                setShopId(res.data.id);
            })
            .catch(err => {
                setManufacturer(initialManufacturer);
                setShopId(null);
                if (err.response.status === 401) {
                    window.location.reload();
                }
            })
    }, [shopId])

    const handleChange = name => event => {
        setManufacturer({...manufacturer, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setManufacturerPhoto(file);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("manufacturerDto", new Blob([JSON.stringify({...manufacturer})], {
            type: "application/json"
        }));
        formData.append("manufacturerPicture", manufacturerPhoto);

        if (shopId === null) {
            AddManufacturer(formData)
                .then(res => {
                    history.push(`/shop/${res.data.id}`)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            UpdateManufacturer(formData, shopId)
                .then(res => {
                    history.push(`/shop/${res.data.id}`)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    const DeleteShop = event => {
        event.preventDefault();
        DeleteManufacturerById(shopId)
            .then(() => {
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Paper className={classes.margin} elevation={3}>
            <h1> {shopId != null ? "Edit" : "Add"} Shop</h1>
            <form onSubmit={handleSubmit} className={classes.flexCenter}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Name" value={manufacturer.name || ''}
                                   onChange={handleChange("name")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <TextField
                            label="Description"
                            multiline
                            rows={5}
                            variant="outlined"
                            value={manufacturer.description || ''}
                            onChange={handleChange('description')}
                            style={{width: "601px"}}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <EmailIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Email" type={"email"}
                                   value={manufacturer.email || ''}
                                   onChange={handleChange("email")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <PhoneIcon/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Phone" value={manufacturer.phoneNumber || ''}
                                   onChange={handleChange("phoneNumber")}
                                   style={{width: "568px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                    <Grid item xs={6} container justify={"flex-end"}>
                        <TextField id="input-with-icon-grid" label="Address" value={manufacturer.address}
                                   onChange={handleChange("address")}
                                   style={{width: '280px'}}/>
                    </Grid>
                    <Grid item xs={6} container justify={"flex-start"}>
                        <TextField id="input-with-icon-grid" label="City" value={manufacturer.city || ''}
                                   onChange={handleChange("city")}
                                   style={{width: '290px'}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={classes.textField}>
                    <Grid item>
                        <TextField id="input-with-icon-grid" placeholder={"Picture"} type={"file"} onChange={handleDrop}
                                   style={{width: "601px"}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={3} justify={"space-between"} className={classes.dualFieldMarginBottom}>
                    <Grid item xs={6} container justify={"flex-end"}>
                        <Button className={classes.bottomMargin} type="submit" variant="outlined"
                                color="primary">Submit</Button>
                    </Grid>
                    <Grid item xs={6} container justify={"flex-start"}>
                        {shopId != null && <Button className={classes.bottomMargin} variant="outlined"
                                                   color="secondary" onClick={DeleteShop}>Delete</Button>}
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default AddUpdateManufacturerDetails