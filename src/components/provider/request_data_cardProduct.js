import React from "react";
import reducer, {dataProducts} from "../context/reducer";

function useRequestCardProduct(){

  const [produk, dispatch] = React.useReducer(reducer, dataProducts);
  React.useEffect(() => {
    function requestData(url){
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const mappingData = data.map(item => {
            return dispatch({
              type:'products',
              data:{
                id:item.id,
                name:item.name,
                price:item.price,
                images:item.image,
                status: item.status,
                description: item.descriptions
              }
            })
          });

          return mappingData;
        })
        .catch(err => console.log(err.message));
    }

    requestData("http://localhost:4000/products")
  }, []);

  return [produk];
}

export default useRequestCardProduct;
