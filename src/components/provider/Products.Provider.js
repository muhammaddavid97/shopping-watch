import React from "react";
import useRequestCardProduct from "./request_data_cardProduct";
import reducer, {dataProducts} from "../context/reducer";
import useRequestCartProducts from "./request_cart_products";

export const ProductsContext = React.createContext();
export const ProductDetailContext = React.createContext();
export const CartProductsContext = React.createContext();

function ProductsProvider({children}){

  const [cardProduct, setCardProduct] = React.useState([]);
  const [cartProduct, setCartProduct] = React.useState([]);
  const [detail_product, dispatch] = React.useReducer(reducer, dataProducts);

  const [produk] = useRequestCardProduct();
  const [cart_products] = useRequestCartProducts();

  React.useEffect(() => {
    setCardProduct(data => [...data, {...produk}])
  }, [produk]);

  React.useEffect(() => {
    setCartProduct(data => [...data, {...cart_products}])
  }, [cart_products])

  return (
    <div>
      <ProductsContext.Provider value={[cardProduct]}>
        <ProductDetailContext.Provider value = {[detail_product, dispatch]}>
          <CartProductsContext.Provider value = {[cartProduct]}>
            {children}
          </CartProductsContext.Provider>
        </ProductDetailContext.Provider>
      </ProductsContext.Provider>
    </div>
  )
}

export default ProductsProvider;
