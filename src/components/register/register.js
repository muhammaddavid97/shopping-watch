import React from "react";
import styled from "./register.module.css";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {registerUser} from "../services/firebase-config";

library.add(faUser);

function Register(){

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleEmailChange = (event) =>{
    const value = event.target.value;
    setEmail(email => email = value);
  }

  const handlePasswordChange = (event) =>{
    const value = event.target.value;
    setPassword(password => password = value);
  }

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(username => username = value);
  }

  return (
    <div id={styled.register_page}>
      <div className={styled.logo_register}>
        <FontAwesomeIcon icon={['fas', 'user']} />
      </div>
      <form>
        <div className={styled.input_username}>
          <label>Username : </label>
          <input type="text" value={username} onChange={(e) => handleUsernameChange(e)} placeholder="masukan username anda" />
        </div>
        <div className={styled.input_email}>
          <label>Email : </label>
          <input type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder="masukan email anda" />
        </div>
        <div className={styled.input_password}>
          <label>Password : </label>
          <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder="masukan password anda" />
        </div>
        <div className={styled.btn_register}>
          <button type="button" onClick={() => registerUser(username, email, password)}>Login</button>
          <button type="button">Login with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Register;
