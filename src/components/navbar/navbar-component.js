import React from "react";
import Navbar from "./navbar";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faBars, faTimes, faShoppingCart)

function NavbarComponent(){

  const [matches, setMatches] = React.useState(false);
  const [query] = React.useState('(max-width: 576px)');

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return (
      <Navbar
      logo="Citizen"
      hamburgerMenu= {matches === true ? <FontAwesomeIcon icon={["fas", "bars"]} /> : null}
      closeSticky = {matches === true ? <FontAwesomeIcon icon={["fas", "times"]} /> : null}
      cartIcon = {<FontAwesomeIcon icon={["fas", "shopping-cart"]} />}
      />
  )
}

export default NavbarComponent;
