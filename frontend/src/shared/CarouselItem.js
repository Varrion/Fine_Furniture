import React from "react";
import Paper from "@material-ui/core/Paper";

function CarouselItem(props) {
    return (
        <Paper style={{
            backgroundImage: "url(" + props.item.image + ")",
            width: "1200px",
            height: "550px",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems:"center",
            justifyContent:"flex-end",
            flexDirection:"column",
            color:"white"
        }}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
        </Paper>
    )
}

export default CarouselItem