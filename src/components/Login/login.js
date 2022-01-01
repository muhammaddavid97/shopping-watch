import React from "react";
import styled from "./login.module.css";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useHistory} from "react-router-dom";

library.add(faUser);

function Login(){

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) =>{
    const value = event.target.value;
    setEmail(email => email = value);
  }

  const handlePasswordChange = (event) =>{
    const value = event.target.value;
    setPassword(password => password = value);
  }

  const history = useHistory();

  const handleSiginEmailPassword = async (email, password) => {
    const auth = getAuth();

    try{
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/table");
    }catch(err){
      console.log(err);
      alert(err.message);
      history.replace("/register");
    }
  }

  return (
    <div id={styled.login_page}>
      <div className={styled.logo_login}>
        <FontAwesomeIcon icon={['fas', 'user']} />
      </div>
      <form>
        <div className={styled.input_email}>
          <label>Email : </label>
          <input type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder="masukan email anda" />
        </div>
        <div className={styled.input_password}>
          <label>Password : </label>
          <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder="masukan password anda" />
        </div>
        <div className={styled.btn_login}>
          <button type="button" onClick={() => handleSiginEmailPassword(email, password)}>Login</button>
          <button type="submit">Login with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
