import React, {useEffect, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {AddFurniture, FurnitureColors, GetAllCategories, UpdateFurniture} from "./FurnitureService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: "15px"
    }
}));


function AddUpdateFurniture(props) {
    const classes = useStyles();
    const [categories, setCategories] = useState(null);
    const [furniturePhoto, setFurniturePhoto] = useState(props.furniture?.picture);
    const [furniture, setFurniture] = useState(
        {
            name: props.furniture?.name ?? '',
            description: props.furniture?.description ?? '',
            categoryId: props.furniture?.category.id ?? 0,
            price: props.furniture?.price ?? 0,
            furnitureColors: props.furniture?.colorSet ?? [],
            manufacturerId: props.manufacturerId ?? null
        }
    );

    useEffect(() => {
        GetAllCategories()
            .then(res => {
                setCategories(res.data);
            })
    }, [])

    const handleChange = name => event => {
        setFurniture({...furniture, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("furnitureDto", new Blob([JSON.stringify({...furniture})], {
            type: "application/json"
        }));
        formData.append("furniturePicture", furniturePhoto);

        if (props.furniture) {
            UpdateFurniture(props.furniture.id, formData)
                .then(() => {
                    props.furnitureChanged(true);
                    props.handleClose();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            AddFurniture(formData)
                .then(res => {
                    props.furnitureChanged(true);
                    props.handleClose();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setFurniturePhoto(file);
    }

    return (
        <Dialog maxWidth={"md"} fullWidth open={props.open} onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Furniture</DialogTitle>
                <DialogContent>
                    <TextField id="input-with-icon-grid" label="Name" value={furniture.name}
                               className={classes.textField}
                               onChange={handleChange("name")} fullWidth/>

                    <TextField id="input-with-icon-grid"
                               multiline
                               rows={5}
                               className={classes.textField}
                               variant="outlined" label="Description" value={furniture.description}
                               onChange={handleChange("description")} fullWidth/>

                    <FormControl fullWidth className={classes.textField}>
                        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={furniture.price}
                            type={"number"}
                            onChange={handleChange('price')}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.textField}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={furniture.categoryId}
                            onChange={handleChange("categoryId")}
                        >
                            {categories && categories.length > 0 && categories.map((category, index) =>
                                <MenuItem key={index} value={category.id}>{category.name} </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.textField} fullWidth>
                        <InputLabel id="demo-mutiple-name-label">Furniture Colors</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={furniture.furnitureColors}
                            onChange={handleChange("furnitureColors")}
                            input={<Input/>}
                        >
                            {FurnitureColors.map((color) => (
                                <MenuItem key={color} value={color} style={{color: color}}>
                                    {color}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Grid container spacing={1} alignItems="flex-end" style={{marginTop: "10px"}}>
                        <Grid item>
                            <TextField id="input-with-icon-grid" fullWidth placeholder={"Picture"} type={"file"}
                                       style={{width: "895px"}}
                                       onChange={handleDrop}/>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        {props.furniture ? "Edit" : "Create"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddUpdateFurniture;