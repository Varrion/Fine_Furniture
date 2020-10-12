import axios from "./../config/axiosConfig"

const userApi = "user"

const BasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password)
}

const EncodeUsernameFromStorage = authUser => {
    let encodedUser = authUser.split(" ")[1];
    let encodedString = atob(encodedUser);
    return encodedString.split(":")[0]
}

async function RegisterUser(registerForm) {
    return axios.post(userApi, registerForm);
}

async function LoginUser(loginForm) {
    return axios.post(`${userApi}/login`, loginForm)
}

async function EditUser(userForm, userId) {
    return axios.put(`${userApi}/${userId}`, userForm)
}

async function GetAllUsers() {
    return axios.get(userApi);
}

async function GetUserDetails(username) {
    return axios.get(`${userApi}/${username}`)
}

async function DeleteUser(userId) {
    return axios.delete(`${userApi}/${userId}`)
}

export {
    LoginUser,
    RegisterUser,
    EditUser,
    GetAllUsers,
    GetUserDetails,
    DeleteUser,
    BasicAuthToken,
    EncodeUsernameFromStorage
}