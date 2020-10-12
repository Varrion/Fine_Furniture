import axios from "./../config/axiosConfig"

const manufacturerApi = "manufacturer"

async function AddManufacturer(manufacturerForm) {
    return axios.post(manufacturerApi, manufacturerForm);
}

async function UpdateManufacturer(manufacturerForm, manufacturerId) {
    return axios.put(`${manufacturerApi}/${manufacturerId}`, manufacturerForm);
}

async function GetAllManufacturers() {
    return axios.get(manufacturerApi);
}

async function GetManufacturerDetails(manufacturerId) {
    return axios.get(`${manufacturerApi}/${manufacturerId}`)
}

async function GetManufacturerByAdmin(manufacturerAdmin) {
    return axios.get(`${manufacturerApi}/my-shop/${manufacturerAdmin}`)
}

async function DeleteManufacturerById(manufacturerId) {
    return axios.delete(`${manufacturerApi}/${manufacturerId}`)
}

export {
    AddManufacturer,
    UpdateManufacturer,
    GetAllManufacturers,
    GetManufacturerDetails,
    GetManufacturerByAdmin,
    DeleteManufacturerById
}