import React from "react";
import styled from "./navbar.module.css";
import {Link} from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {useHistory} from "react-router-dom";

function Navbar({logo, menu, hamburgerMenu, closeSticky, cartIcon}){

  const [sticky, setSticky] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(null);
  const history = useHistory();

  const handleHamburgerMenu = () => {
    setSticky(false);
  }

  const handleCloseSticky = () => {
    setSticky(true);
  }

  React.useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user !== null){
        setLoggedIn(user);
      }
    })
  }, [loggedIn]);

  const handleLogout = async () => {
    const auth = getAuth();
    try{
      await signOut(auth);
      alert("logout sukses");
      history.push("/login");
    }catch(err){
      alert(err.message);
    }
  }

  const carAuthProduct = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user !== null){
        history.replace("/table");
      }else{
        alert("anda belum login");
        history.replace("/login");
      }
    })
  }

  return(
    <nav>
      <div className={styled.logo_navbar}>
        <h2>{logo}</h2>
      </div>
      <div className={styled.menu_navbar}>
        <ul className={sticky === true ? [styled.list_navbar + " " + styled.sticky_navbar] : [styled.list_navbar + " " + styled.closed]}>
          <div className={styled.close_sticky} onClick={() => handleCloseSticky()}>
            {closeSticky}
          </div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Product</Link></li>
          <li><Link to="/">About</Link></li>
          {
            loggedIn !== null ? <li><Link to="/login" onClick={() => handleLogout()}>Logout {loggedIn.email}</Link></li> : null
          }
          {
            loggedIn === null ? <li><Link to="/login">Login</Link></li> : null
          }
          <li className={styled.cart_icon}><Link to="/table" onClick={() => carAuthProduct()}>{cartIcon}</Link></li>
        </ul>
      </div>
      <div className={styled.hamburger_menu} onClick={() => handleHamburgerMenu()}>
        {hamburgerMenu}
      </div>
    </nav>
  )
}

export default Navbar;
