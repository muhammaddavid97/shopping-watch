import React from "react";
import styled from "./Shopping.module.css";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CartProductsContext} from "../provider/Products.Provider";
import {getFirestore, collection, addDoc, doc, getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

library.add(faTrash);

function Shopping(){

  const [cartProduct] = React.useContext(CartProductsContext);
  const [products, setProducts] = React.useState([]);
  const [pengguna, setUser] = React.useState({});

  React.useEffect(() => {
    setProducts(products => products = cartProduct);
  }, [cartProduct]);


  const handleDeletedProduct = (id) => {
    const deleted = products.filter(item => item.id !== id);
    return fetch(`http://localhost:5000/keranjang/${id}`, {
      method:'DELETE'
    })
    .then(() => {
      alert("data berhasil dihapus");
      setProducts(deleted);
    })
    .catch(err => console.log(err.message));
  }

  const computedTotalPrice = products.filter(item => item.totalPrice !== undefined)
                                      .map(item => item.totalPrice);

  const total = computedTotalPrice.reduce((a,b) => a + b, 0);

  React.useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user){
        const getUsernameAndEmail = async () => {
          try{
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return docSnap.data();
            } else {
              console.log("No such document!");
            }
          }catch(err){
            alert(err.message);
          }
        }

        getUsernameAndEmail()
          .then(result => {
            setUser(pengguna => pengguna = result);
          })
          .catch(err => console.log(err.message));
      }
    });
  }, []);

  const handleSaveProducts = async () => {
    const db = getFirestore();
    const filteredProducts = products.filter(item => item.totalPrice !== undefined);
    try{
      await addDoc(collection(db, "shopping_user",), {
        username:pengguna.username,
        email:pengguna.email,
        token:pengguna.token,
        product:filteredProducts,
        totalPrice:total
      });
      alert("data berhasil disimpan");
      setProducts(products => products = []);
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <section id={styled.shopping_user}>
      {
        products.map(item => {
          return (
            item.price > 0 ?
            <div className={styled.cart_shop}>
              <div className={styled.image_product}>
                <img src={item.images} alt={item.name}/>
              </div>
              <div className={styled.information_product}>
                <div className={styled.title_product}>
                  <h2>{item.name}</h2>
                </div>
                <div className={styled.table_user}>
                  <div className={styled.detail_products}>
                    <p><span>Price Product : </span>Rp. {item.price}</p>
                    <p><span>Count Product : </span>{item.count}</p>
                    <p><span>Noted Product: </span>{item.noted}</p>
                    <p><span>Total Price Produt : </span>Rp. {item.totalPrice}</p>
                  </div>
                </div>
              </div>
              <div className={styled.delete_product}>
                <FontAwesomeIcon icon={['fas', 'trash']} size="xs" className={styled.trash_icon} onClick={() => handleDeletedProduct(item.id)}/>
              </div>
            </div>
            : null
          )
        })
      }
      {
        products.length !== 0 ?
          <div className={styled.save_products}>
            <div className={styled.total_price}>
              <h3>Total Belanja : <span>Rp.{total}</span></h3>
            </div>
            <div className={styled.btn_save}>
              <button type="button" onClick = {() => handleSaveProducts()}>Order Now Product</button>
            </div>
          </div>
        : null
      }
    </section>
  )
}

export default Shopping;
