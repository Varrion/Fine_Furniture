import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DefaultPicture from "../assets/images/furnitureDefault.jpg"
import EuroIcon from '@material-ui/icons/Euro';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: "250px",
        minHeight: "290px",
        margin: "5px"
    },

    flexStart: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },

    flexBetween: {
        display: "flex",
        justifyContent: "space-between"
    }
});

function CardItem(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Furniture Item"
                    height="140"
                    src={props.image ? "data:image/jpeg;base64," + props.image : DefaultPicture}
                    title="Furniture"
                />
                <CardContent className={classes.flexStart}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.flexBetween}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.isShop
                        ? props.manufacturerAdmin
                        : <> Price <EuroIcon fontSize={"inherit"}/> {props.price} </>}
                </Typography>
                <Button size="small" color="primary"
                        onClick={() => props.isShop ? history.push(`/shop/${props.id}`) : history.push(`/furniture/${props.id}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

export default CardItem;