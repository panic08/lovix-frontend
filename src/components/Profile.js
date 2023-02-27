import React from "react";
import AuthService from "../api/auth.service";
import {Navigate, Route, useNavigate} from "react-router-dom";
import Form from "react-validation/build/form";
import BoardUser from "./BoardUser";
import Home from "./Home";
import Login from "./Login";



const Profile = () => {

    if (!AuthService.isAuthorize()){

        return <Login/>
    }


  const currentUser = AuthService.getCurrentUser();
  const currentUsername = AuthService.getCurrentUsername();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUsername}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
