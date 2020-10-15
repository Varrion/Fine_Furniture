import axios from "../config/axiosConfig";

const categoryRoute = "category";
const furnitureRoute = "furniture";

const FurnitureColors = ["White", "Black", "Green", "Yellow", "Blue", "Red", "Orange", "Pink", "Brown"];

const FurnitureTypes = ["Sofas", "Tables", "Chairs", "Beds", "Desks", "NightStands", "Cabinets", "Closets", "Mattresses", "TvStands", "Bookcases"]

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

async function GetAllFurniture() {
    return axios.get(furnitureRoute)
}

async function GetFurnitureByManufacturer(manufacturerId) {
    return axios.get(`${furnitureRoute}/manufacturer/${manufacturerId}`)
}

async function GetFurnitureByCategory(categoryId) {
    return axios.get(`${furnitureRoute}/category/${categoryId}`)
}

async function GetFurnitureDetails(furnitureId) {
    return axios.get(`${furnitureRoute}/${furnitureId}`)
}

async function AddFurniture(furnitureForm) {
    return axios.post(furnitureRoute, furnitureForm);
}

async function UpdateFurniture(furnitureId, furnitureForm) {
    return axios.put(`${furnitureRoute}/${furnitureId}`, furnitureForm);
}

async function DeleteFurniture(furnitureId) {
    return axios.delete(`${furnitureRoute}/${furnitureId}`);
}

async function BuyFurniture(paymentInfo) {
    return axios.post(`${furnitureRoute}/buy`, paymentInfo)
}

export {
    AddCategory,
    GetAllCategories,
    GetCategoryDetails,
    UpdateCategory,
    GetAllFurniture,
    GetFurnitureByCategory,
    GetFurnitureByManufacturer,
    GetFurnitureDetails,
    AddFurniture,
    UpdateFurniture,
    DeleteFurniture,
    BuyFurniture,
    FurnitureColors,
    FurnitureTypes
}