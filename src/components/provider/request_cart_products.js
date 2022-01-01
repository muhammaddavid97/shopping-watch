import React from "react";
import reducer, {dataProducts} from "../context/reducer";

function useRequestCartProducts(){

  const [cart_products, dispatch] = React.useReducer(reducer, dataProducts);

  React.useEffect(() => {

    function requestCartProduct(url){

      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const mappingData = data.map(item => {
            return dispatch({
              type:'cart_product',
              data:{
                name:item.name,
                id:item.id,
                price:item.price,
                count:item.count,
                noted:item.noted,
                totalPrice:item.totalPrice,
                images:item.image
              }
            })
          });

          return mappingData;
        })
        .catch(err => console.log(err.message));
    }

    requestCartProduct('http://localhost:5000/keranjang');
  }, []);

  return [cart_products];
}

export default useRequestCartProducts;
