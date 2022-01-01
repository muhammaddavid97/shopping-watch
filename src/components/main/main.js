import React from "react";
import CardProducts from "./card-products";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ProductsDetail from "./product-details";

function Main(){

  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/product">
            <CardProducts />
          </Route>
          <Route path="/product/:id">
            <ProductsDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default Main;
