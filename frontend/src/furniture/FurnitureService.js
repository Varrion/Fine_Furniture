import axios from "../config/axiosConfig";

const categoryRoute = "category"

async function AddCategory(categoryForm) {
    return axios.post(categoryRoute, categoryForm)
}

async function GetAllCategories() {
    return axios.get(categoryRoute)
}

async function UpdateCategory(categoryForm) {
    return axios.put(categoryRoute, categoryForm);
}

async function GetCategoryDetails(categoryId) {
    return axios.get(`${categoryRoute}/${categoryId}`)
}

export {AddCategory, GetAllCategories, GetCategoryDetails, UpdateCategory}