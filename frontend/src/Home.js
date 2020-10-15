import React, {useContext, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./shared/CarouselItem";
import Image1
    from './assets/images/Mesmerizing-African-Living-Room-Furniture-decor-gorgeous-ikea-living-room-furniture-with-Mesmerizing-African-Furniture-Living-Room-.jpg';
import Image2 from './assets/images/laura-sofa-taupe_c19a05e7-cbb2-4d8e-b441-edddec0ae263_2000x.jpg';
import Image3 from './assets/images/P16_Laura_Sofa_WEB_a71b316b-73e5-4412-86ea-bf5face30fa3_2000x.jpg';
import {Button, Grid, Typography} from "@material-ui/core";
import AddUpdateCategory from "./furniture/category/AddUpdateCategory";
import {GetAllCategories} from "./furniture/FurnitureService";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import {GetAllManufacturers} from "./manufacturer/ManufacturerService";
import CardItem from "./shared/CardItem";
import {EncodeUsernameFromStorage, GetUserDetails} from "./user/UserService";
import {authContext} from "./config/authentication";

const useStyles = makeStyles((theme) => ({
    horizontalLine: {
        width: "70%",
        borderBottom: "1px solid gray"
    },

    flexColumn: {
        display: "flex",
        flexDirection: "column"
    },

    link: {
        textDecoration: "none",
        color: "black",
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}));

function Home(props) {
    const classes = useStyles();

    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    const [categories, setCategories] = useState(null);
    const [shops, setShops] = useState(null);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);
    const {auth} = useContext(authContext);
    const [loggedUser, setLoggedUser] = useState(null);


    const items = [
        {
            image: Image1,
        },
        {
            image: Image2,
        },
        {
            image: Image3,
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
        if (auth && !auth.loading && auth.data) {
            GetUserDetails(EncodeUsernameFromStorage(auth.data))
                .then(res => {
                    setLoggedUser(res.data);
                })
                .catch(err => console.log(err))
        }

        GetAllCategories()
            .then(res => {
                setCategories(res.data);
            })

        GetAllManufacturers()
            .then(res => {
                setShops(res.data);
            })
    }, [isCategoryAdded, auth])

    return (
        <div>
            <Grid container spacing={1} justify={"space-between"}>
                <Grid item xs={2} className={"flex-column-start"}>
                    <h2>Categories</h2>
                    {categories && categories.length > 0
                    && categories.map(category => <Typography gutterBottom component={Link} variant={"body1"}
                                                              to={`category/${category.id}`}
                                                              className={classes.link}
                                                              key={category.id}> {category.name} </Typography>)}
                    {loggedUser && loggedUser.isManufacturer &&
                    <Button color={"primary"} variant={"outlined"} onClick={handleOpenCategoryModal}>
                        Add Category
                    </Button>}
                </Grid>
                <Grid item xs={10}>
                    <Carousel>
                        {
                            items.map((item, index) => <CarouselItem key={index} item={item}/>)
                        }
                    </Carousel>
                </Grid>

                {shops && shops.length > 0 &&
                <div className={classes.flexColumn}>
                    <hr className={classes.horizontalLine}/>
                    <Typography variant={"h4"} gutterBottom>
                        Manufacturers of Fine Furniture
                    </Typography>
                    {shops.map(shop =>
                        <Grid item xs={4} key={shop.id}>
                            <CardItem
                                isShop={true}
                                id={shop.id}
                                title={shop.name}
                                manufacturerAdmin={`by ${shop.manufacturerAdmin.name} ${shop.manufacturerAdmin.surname}`}
                                description={shop.description}
                                image={shop.picture}/>
                        </Grid>)}
                </div>
                }
            </Grid>
            {openCategoryModal
            && <AddUpdateCategory isCategoryAdded={setIsCategoryAdded} isEdit={false} open={openCategoryModal}
                                  handleClose={handleCloseCategoryModal}/>}
        </div>
    )
}

export default Home;