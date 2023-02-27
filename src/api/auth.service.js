

import axios from "axios";
import Cookies from 'js-cookie';


const API_URL = "http://localhost:8080/api/auth/";




const register = (username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  })
      .then((response) => {
        if (response.data.username) {
          Cookies.set('rememberMe', response.data.username)
          delete response.data.username
          localStorage.setItem("rememberMe", JSON.stringify(response.data));
        }
      });
}

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        Cookies.set('rememberMe', response.data.username)
        delete response.data.username
        localStorage.setItem("rememberMe", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  Cookies.remove('rememberMe')
  localStorage.removeItem("rememberMe");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const isAuthorize = () => {
  if (localStorage.getItem("rememberMe") !== null && Cookies.get("rememberMe") !== null){
    return true;
  }
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("rememberMe"));
};
const getCurrentUsername = () => {
  return Cookies.get('rememberMe')

}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthorize,
  getCurrentUsername,
}

export default AuthService;
