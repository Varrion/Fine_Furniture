import React, {useEffect, useState} from "react";
import {GetCategoryDetails} from "../FurnitureService";
import {useParams} from "react-router-dom";

function CategoryDetails(props) {
    let {categoryId} = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        GetCategoryDetails(categoryId)
            .then(res => {
                setCategory(res.data);
                console.log(res.data);
            })
    }, [])


    return (
        <>
            {category &&
            <h2>
                {category.name}
            </h2>
            }
        </>
    )
}

export default CategoryDetails;