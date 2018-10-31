//The sole purpose of this file is register the user.  a post request is made and and console.log the response.data 

import axios from "axios";

const apiRegister = "https://lambdamud-backend.herokuapp.com/api/registration/"; // post



export const registerUser = credentials => {
  //The handleRegister function inside of the Register.js componenet is relied on for conditional checks before sending the request.
  //Once data gets here it should led to a successful status returned
  const promise = axios.post(apiRegister, credentials);
  promise
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response);
    });
};
