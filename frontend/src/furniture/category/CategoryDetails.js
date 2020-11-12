import React, {useContext, useEffect, useState} from "react";
import {GetCategoryDetails, GetFurnitureByCategory} from "../FurnitureService";
import {useParams} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardItem from "../../shared/CardItem";
import Button from "@material-ui/core/Button";
import AddUpdateCategory from "./AddUpdateCategory";
import {authContext} from "../../config/authentication";
import {EncodeUsernameFromStorage, GetUserDetails} from "../../user/UserService";

const useStyles = makeStyles({
    horizontalLine: {
        width: "70%",
        borderBottom: "1px solid gray"
    },

    grid: {
        padding: "10px"
    }
})


function CategoryDetails(props) {
    const classes = useStyles();
    const [category, setCategory] = useState(null);
    const [categoryFurniture, setCategoryFurniture] = useState(null);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const {auth} = useContext(authContext);
    const [loggedUser, setLoggedUser] = useState(null);
    let {categoryId} = useParams();


    useEffect(() => {
        GetCategoryDetails(categoryId)
            .then(res => {
                setCategory(res.data);
                GetFurnitureByCategory(res.data.id)
                    .then(r => {
                        setCategoryFurniture(r.data);

                        if (auth && !auth.loading && auth.data) {
                            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                                .then(res => {
                                    setLoggedUser(res.data);
                                })
                                .catch(err => console.log(err))
                        }
                    })
            })
    }, [showUpdateCategoryModal])

    return (
        <>
            {category &&
            <Paper>
                <Typography variant={"h3"}>
                    {category.name}
                </Typography>
                <Typography variant={"subtitle1"}>
                    {category.description}
                </Typography>

                <hr className={classes.horizontalLine}/>
                <Grid container direction={"column"} alignItems={"flex-start"}>
                    <Grid item xs={12}>
                        <Grid container spacing={3} className={classes.grid}>
                            {categoryFurniture && categoryFurniture.length > 0 && categoryFurniture.map(furniture =>
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

                {loggedUser && loggedUser.isManufacturer && <Button variant="outlined" style={{margin: "10px"}}
                                                                    onClick={() => setShowUpdateCategoryModal(true)}> Edit
                    Category</Button>}
                {showUpdateCategoryModal &&
                <AddUpdateCategory category={category} open={showUpdateCategoryModal} isEdit={true}
                                   handleClose={() => setShowUpdateCategoryModal(false)}/>}
            </Paper>
            }
        </>
    )
}

export default CategoryDetails;