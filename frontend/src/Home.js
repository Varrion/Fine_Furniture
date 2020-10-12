import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./shared/CarouselItem";
import Image1
    from './assets/images/Mesmerizing-African-Living-Room-Furniture-decor-gorgeous-ikea-living-room-furniture-with-Mesmerizing-African-Furniture-Living-Room-.jpg';
import Image2 from './assets/images/laura-sofa-taupe_c19a05e7-cbb2-4d8e-b441-edddec0ae263_2000x.jpg';
import Image3 from './assets/images/P16_Laura_Sofa_WEB_a71b316b-73e5-4412-86ea-bf5face30fa3_2000x.jpg';
import {Button, Grid} from "@material-ui/core";
import AddUpdateCategory from "./furniture/category/AddUpdateCategory";
import {GetAllCategories} from "./furniture/FurnitureService";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    category: {
        marginBottom: "5px",
    }
}));

function Home(props) {
    const classes = useStyles();

    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    const [categories, setCategories] = useState(null);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);

    const items = [
        {
            image: Image1,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: Image2,
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            image: Image3,
            name: "Random Name #3",
            description: "Hello World!"
        }
    ]

    const handleOpenCategoryModal = () => {
        setOpenCategoryModal(true);
    };

    const handleCloseCategoryModal = () => {
        setOpenCategoryModal(false);
        setIsCategoryAdded(false);
    };

    useEffect(() => {
        GetAllCategories()
            .then(res => {
                setCategories(res.data);
            })
    }, [isCategoryAdded])

    return (
        <div>
            <Grid container spacing={1} justify={"space-between"}>
                <Grid item xs={2} className={"flex-column-start"}>
                    <h3>Categories</h3>
                    {categories && categories.length > 0
                    && categories.map(category => <Link to={`category/${category.id}`} className={classes.category}
                                                        key={category.id}> {category.name}</Link>)}
                    <Button color={"primary"} variant={"outlined"} onClick={handleOpenCategoryModal}>
                        Add Category
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Carousel>
                        {
                            items.map((item, index) => <CarouselItem key={index} item={item}/>)
                        }
                    </Carousel>
                </Grid>
            </Grid>
            {openCategoryModal
            && <AddUpdateCategory isCategoryAdded={setIsCategoryAdded} isEdit={false} open={openCategoryModal}
                                  handleClose={handleCloseCategoryModal}/>}
        </div>
    )
}

export default Home;