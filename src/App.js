import React, {useState, useEffect, useRef} from "react";
import {Routes, Route, Link, NavLink, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./api/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import main from "./components/UI/main.module.css"
import history from "history"

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import authService from "./api/auth.service";
import Header from "./components/Header";
import Modal from "./components/UI/Modal";
import games from "./components/UI/games.module.css";



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined)
  const [activeTab, setActiveTab] = useState("tab1");
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const userName = AuthService.getCurrentUsername();

    if (user) {
      setCurrentUser(user);
      setCurrentUsername(userName)
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const [modalActive, setModalActive] = useState(false)
  const navigate = useNavigate();

  const checkBtn = useRef();
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");


    AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {

          console.log(error.message)
          const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          setMessage("Неверный логин или пароль");
          setTimeout(() => {setMessage("")}, 1650)
        }
    );

  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");





    AuthService.register(username, password).then(
        (response) => {
          navigate("/profile");
          window.location.reload();
          setMessage(response.data.message);


        },
        (error) => {
          const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          setMessage(resMessage);
          setTimeout(() => {setMessage("")}, 1650)
        }
    );


  };
  const [message, setMessage] = useState("");

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 992;
  if (isMobile){
    console.log("мобила")
  }
  return (

    <div>
      {message && (
          <div onClick={() => {if (message !== "") {setMessage("")}}} className={games.error1}>
            <img src={require('./components/UI/images/error.png')}/>
            <h3>Ошибка</h3>
            <p>{message}</p>
          </div>
      )}

      {!isMobile ? (
          <header>
            <nav>
              <div className={main.nav__wrapper}>
                <div className={main.nav__container}>
                  <NavLink


                      to="/">
                    <div className={main.nav__text}>

                      <a>lov<span className={main.nav__text_dop}>ix</span></a>
                    </div>
                  </NavLink>
                  <div className={main.nav__buttons}>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        className={({isActive}) => isActive ? main.nav__buttons_text_active : "non-active-class" }
                        to="/">
                      <a className={main.nav__buttons_text}>Игры</a>
                    </NavLink>
                    <a className={main.nav__buttons_text} href="#" style={{cursor: "pointer"}}>Ранги</a>
                    <a className={main.nav__buttons_text} href="#" style={{cursor: "pointer"}}>Бонусы</a>


                  </div>

                  {authService.isAuthorize() ? (
                          <div className={main.nav__other}>
                            <div className={main.nav__buttons2}>
                              {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                              <div className={main.mayday}>
                                <img className={main.nav__other__img} src={require('./components/UI/images/profile.png')}/>
                              </div>
                              <div className={main.mayday2}>
                                <img className={main.nav__other__img} src={require('./components/UI/images/dots (1).png')}/>
                              </div>




                            </div>

                          </div>
                      ) :
                      <div className={main.nav__other2}>
                        <div onClick={() => setModalActive(true)} className={main.nav__buttons3}>
                          {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                          <div  className={main.mayday3}>
                            <a>Регистрация</a>
                          </div>
                        </div>
                      </div>

                  }

                  {authService.isAuthorize() ? (
                          <div className={main.nav__other2}>
                            <div className={main.nav__buttons3}>
                              {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                              <div className={main.mayday3}>
                                <a>Пополнить</a>
                              </div>
                            </div>
                          </div>
                      ) :
                      <div className={main.nav__other2}>
                        <div onClick={() => setModalActive(true)} className={main.nav__buttons3_auth}>
                          {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                          <div  className={main.mayday3}>
                            <a  style={{color: "#748198"}}>Войти</a>
                          </div>
                        </div>
                      </div>

                  }

                  {authService.isAuthorize() ? (
                      <div className={main.nav__other3}>
                        <div className={main.nav__buttons4}>
                          {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                          <div className={main.mayday4}>
                            <p style={{color: "#748198"}}>БАЛАНС</p>

                          </div>
                          <div>
                            <p className={main.nav__other_text}>100.00 P</p>
                          </div>
                          <hr className={main.nav__other_hr}/>
                        </div>
                      </div>
                  ) : null}




                </div>
              </div>

              <hr/>
            </nav>
          </header>
      ) : <div className={main.nav__wrapper}>
          <div className={main.nav__container}>
            <NavLink


                to="/">
              <div className={main.nav__text}>

                <a><span className={main.nav__text_dop1}><span className={main.nav__text_dop1_img}>❤️</span>X</span></a>
              </div>
            </NavLink>
            <div className={main.nav__other2}>
              <div onClick={() => setModalActive(true)} className={main.nav__buttons3}>
                {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                <div  className={main.mayday3}>
                  <a>Регистрация</a>
                </div>
              </div>
            </div>

            <div className={main.nav__other2}>
              <div onClick={() => setModalActive(true)} className={main.nav__buttons3_auth}>
                {/*<img src={require('./components/UI/images/dots (1).png')}/>*/}
                <div  className={main.mayday3}>
                  <a  style={{color: "#748198"}}>Войти</a>
                </div>
              </div>
            </div>

          </div>

      </div>}


      {!isMobile ? (
      <div className={main.gui__wrapper}>
      <div className={main.gui__container}>

        <NavLink

            className={({isActive}) => isActive ? main.gui__blocksd : "non-active-class" }
            to="/miner">
      <div className={main.gui__blocks}>
        <img src={require('./components/UI/images/bomb-antivirus-danger-symbol.png')}/>
      </div>
        </NavLink>
        <NavLink

            className={({isActive}) => isActive ? main.gui__blocksd : "non-active-class" }
            to="/coinflip">



          <div className={main.gui__blocks}>

          <img src={require('./components/UI/images/conflipIcon.png')}/>

        </div>
        </NavLink>

        <NavLink

            className={({isActive}) => isActive ? main.gui__blocksd : "non-active-class" }
            to="/dice">
        <div className={main.gui__blocks}>
          <img src={require('./components/UI/images/dice.png')}/>
        </div>
        </NavLink>




      </div>


      </div>
          ) : null}
      <Modal active={modalActive} setActive={setModalActive} >


        <div className={games.modal_container}>
          <img src={require('./components/UI/images/signup.png')}/>
          <div>
            <p onClick={() => setActiveTab('tab1')} className={activeTab === "tab1" ? "lox active" : ""}>Войти</p>

            <p onClick={() => setActiveTab('tab2')} className={activeTab === "tab2" ? "lox active" : ""}>Регистрация</p>
          </div>
        </div>

        <hr className={games.hr3}/>
        {activeTab === 'tab1' ? (
            <div className={games.inputes}>

              <input onChange={onChangeUsername} value={username} className={games.modal_container__input} placeholder="Ваш логин"/>
              <input onChange={onChangePassword} value={password} type="password" className={games.modal_container__input} placeholder="Ваш пароль"/>
            </div>
        ) : <div className={games.inputes}>

          <input   onChange={onChangeUsername} value={username} className={games.modal_container__input} placeholder="Введите логин"/>
          <input  onChange={onChangePassword} value={password} type="password" className={games.modal_container__input} placeholder="Введите пароль"/>
        </div>}
        {activeTab === 'tab1' ? (
            <div className={games.modal__button}>
              <a onClick={handleLogin}  style={{textDecoration: "none", color: "white"}} className={games.modal_container_a}>Войти</a>
            </div>
        ) :           <div className={games.modal__button}>
          <a onClick={handleRegister}  style={{textDecoration: "none", color: "white"}} className={games.modal_container_a1}>Зарегистрироваться</a>
        </div>}



        <div className={games.podrob}>
          <p>&nbsp;&nbsp;Я подтверждаю,&nbsp;что&nbsp;мне&nbsp;исполнилось 18 лет,&nbsp;и&nbsp;я<br/>&nbsp;ознакомился(-лась)&nbsp;с&nbsp;

            <NavLink to="/miner" className={games.podrob_desc} style={{textDecoration: "none"}}><span>условиями&nbsp;предоставления<br/>услуг</span></NavLink></p>

        </div>


        <div>
          <hr className={games.hr4}/>
          <div className={games.password__unknown}>
            <p>Забыли&nbsp;пароль?</p>
          </div>
        </div>



      </Modal>



      <div className="container mt-3">
        <Routes>
          <Route />
          <Route exact path={"/"}  element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />

        </Routes>
      </div>





    </div>
  );
};

export default App;
