import React, { useState, useEffect } from "react";

import UserService from "../api/user.service";
import EventBus from "../common/EventBus";
import authService from "../api/auth.service";
import {Navigate} from "react-router-dom";
import history from "./history"
import AuthService from "../api/auth.service";
import Login from "./Login";





const BoardUser = () => {

  const [content, setContent] = useState("");

  useEffect(() => {
    try {
      console.log(authService.getCurrentUser().username)
    }catch (err){

        console.log("жидим нахуй")

    }
  }, []);




  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {

        }
      }
    );
  }, []);

  if (AuthService.isAuthorize()){
    // authService.logout();
    return <Login/>
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;
