import React, {useState, useEffect, useRef} from "react";

import UserService from "../api/user.service";
import games from "./UI/games.module.css"

import Table from "./Table";
import authService from "../api/auth.service";
import Modal from "./UI/Modal";

import {NavLink, useNavigate} from "react-router-dom";
import AuthService from "../api/auth.service";

import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";




const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
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
  const [activeTab, setActiveTab] = useState("tab1");

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


  return (

  <div className={games.games__wrapper}>

    <div className={games.games__container}>
      {authService.isAuthorize() ? (
      <div className={games.games__block}>

    <p className={games.games__block_text}> <img className={games.games__block_img} src={require("./UI/images/smile_fingers.png")}/>С возвращением, <span>fistingA</span></p>
    <p className={games.games__block_about}>Ваш VIP прогресс&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style={{color: "white"}}>0%</span></p>
        <p className={games.games__block_rang}><span>БЕЗ РАНГА</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style={{color: "white"}}>БРОНЗА</span></p>

      </div>
      ) : (

          <div>

          <div className={games.games__block2}>
          <h1>Lov1x - Лучшая рулетка в рунете <img className={games.games__block2_img} src={require('./UI/images/heart.png')}/></h1>
            <p>Уникальные игры с выводом денег</p>
            <p>и сертификатом RNG</p>
          </div>
            <div className={games.games__players}>
              <p><p className={games.circle}></p> ИГРОКОВ</p>
              <h4>26</h4>
            </div>
            <div className={games.games__players2}>
              <p><p style={{color: "grey"}} className={games.circle2}></p> СЫГРАНО ИГР</p>
              <h4>2143</h4>
            </div>
            <div className={games.registr}>
              <p><img src={require('./UI/images/gift.png')}/> ПРОМОКОДЫ, РАНГИ И МНОГОЕ ДРУГОЕ</p>
              <a onClick={() => setModalActive(true)}  style={{textDecoration: "none", color: "#084109"}} className={games.registr_a}>РЕГИСТРАЦИЯ В ОДИН КЛИК</a>



            </div>



          </div>


      )


      }

      <div className={games.target}>
      <p className={games.into__text}><img className={games.games__games_img2} src={require('./UI/images/gamepad.png')}/>Lov1x&nbsp;Original&nbsp;Games</p>
      <div className={games.games__boxes}>
      <div className={games.games__games1}>
      </div>

      <div className={games.games__games2}>
      </div>

      <div className={games.games__games3}>
      </div>
        {/*<div className={games.games__games4}>*/}
        {/*</div>*/}
        {/*<div className={games.games__games5}>*/}
        {/*</div>*/}
        {/*<div className={games.games__games6}>*/}
        {/*</div>*/}
        <Table/>
        {message && (
        <div onClick={() => {if (message !== "") {setMessage("")}}} className={games.error}>
          <img src={require('./UI/images/error.png')}/>
          <h3>Ошибка</h3>
          <p>{message}</p>
        </div>
            )}
        <Modal active={modalActive} setActive={setModalActive} >


          <div className={games.modal_container}>
          <img src={require('./UI/images/signup.png')}/>
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

  


      </div>

      </div>











    </div>

  </div>
  );
};

export default Home;
