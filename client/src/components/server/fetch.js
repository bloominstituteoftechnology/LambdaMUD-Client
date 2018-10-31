import axios from "axios";

const apiRegister = "https://lambdamud-backend.herokuapp.com/api/registration/"; // post
const apiMove = "https://lambdamud-backend.herokuapp.com/api/adv/move/"; // post
const apiSay = "https://lambdamud-backend.herokuapp.com/api/adv/say"; // post


export const registerUser = credentials => {
  const promise = axios.post(apiRegister, credentials);
  promise
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response);
    });
};
