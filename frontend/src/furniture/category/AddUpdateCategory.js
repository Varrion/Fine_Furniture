import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AddCategory} from "../FurnitureService";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },

    textField: {
        marginBottom: "30px",
    },
}));

function AddUpdateCategory(props) {
    const classes = useStyles();

    const initialCategory = {
        name: '',
        description: ''
    }

    const [category, setCategory] = useState(initialCategory)

    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        AddCategory(category)
            .then(response => {
                props.isCategoryAdded(true);
                props.handleClose();
            })
            .catch(err => {
                console.log(err)
                props.isCategoryAdded(false);
            })
    };

    useEffect(() => {
        setCategory(initialCategory);
    }, [])

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">{!props.isEdit ? 'Add Category' : 'Edit Category'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth={true}
                        value={category.name}
                        onChange={handleChange('name')}
                        className={classes.textField}
                    />
                    <DialogContentText>
                        Add some information about the type of the furniture you have entered. This field is not
                        mandatory.
                    </DialogContentText>
                    <TextField
                        label="Description"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={category.description}
                        onChange={handleChange('description')}
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Subscribe
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddUpdateCategory;