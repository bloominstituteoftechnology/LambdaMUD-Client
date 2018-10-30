import axios from "axios";

const apiLogin = "https://lambdamud-backend.herokuapp.com/api/login" // post
const apiRegister = "https://lambdamud-backend.herokuapp.com/api/registration/" // post
const apiMove = "https://lambdamud-backend.herokuapp.com/api/adv/move/"// post
const apiSay = "https://lambdamud-backend.herokuapp.com/api/adv/say" // post
const apiInit = "https://lambdamud-backend.herokuapp.com/api/adv/init/" //get
export const loginUser = (credentials) => {
    const promise = axios.post(apiLogin, credentials);
    promise
    .then(response => (
        console.log(response.data)
    ))
    .catch(error => (
        console.log(error)
    ))
}
export const registerUser = (credentials) => {
    const promise = axios.post(apiRegister, credentials)
    promise
    .then(response => {
        console.log(response.data)
    })
    .catch(error => (
        console.log(error.response)
    ))
}
