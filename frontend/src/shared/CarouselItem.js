import React from "react";
import Paper from "@material-ui/core/Paper";

function CarouselItem(props) {
    return (
        <Paper style={{
            backgroundImage: "url(" + props.item.image + ")",
            width: "1200px",
            height: "600px",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column",
            color: "white"
        }}>
        </Paper>
    )
}

export default CarouselItem