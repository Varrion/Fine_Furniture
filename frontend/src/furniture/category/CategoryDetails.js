import React, {useEffect, useState} from "react";
import {GetCategoryDetails, GetFurnitureByCategory} from "../FurnitureService";
import {useParams} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardItem from "../../shared/CardItem";

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
    let {categoryId} = useParams();

    useEffect(() => {
        GetCategoryDetails(categoryId)
            .then(res => {
                setCategory(res.data);
                GetFurnitureByCategory(res.data.id)
                    .then(r => {
                        setCategoryFurniture(r.data);
                    })
            })
    }, [])


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
            </Paper>
            }
        </>
    )
}

export default CategoryDetails;