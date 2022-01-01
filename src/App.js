import React from "react"
import NavbarComponent from "./components/navbar/navbar-component";
import Main from "./components/main/main";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Shopping from "./components/main/Shopping";
import Login from "./components/Login/login";
import Register from "./components/register/register";
import ProductsProvider from "./components/provider/Products.Provider";
function App() {

  return (
    <div className="App">
        <header>
          <BrowserRouter>
            <NavbarComponent />
            <Switch>
              <ProductsProvider>
                <Route path="/product">
                  <Main />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/table">
                    <Shopping />
                </Route>
              </ProductsProvider>
            </Switch>
          </BrowserRouter>
        </header>
    </div>
  );
}

export default App;
