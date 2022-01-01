import React from "react";
import { faPlus, faMinus, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "./cart-products-detail.module.css";

library.add(faPlus, faMinus, faPencilAlt);

function CartProductsDetail({price_product, name_product, image_product}){

  let [count, setCount] = React.useState(0);
  const [addNote, setAddNote] = React.useState(false);
  const [noted, setNoted] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleAddCounter = () => {
    setCount(count => count + 1)
  }

  const handleReduceCounter = () => {
    if (count <= 0){
      return count;
    }else{
      setCount(count => count - 1);
    }
  }

  const handleCounterProduct = (event) => {
    const value = event.target.value;
    setCount(count => count = value);
  }

  const handleAddNote = () => {
    setAddNote(addNote => !addNote);
  }

  const handleNoted = (event) => {
    const value = event.target.value;
    setNoted(noted => noted = value);
  }

  React.useEffect(() => {
    if (count >= 1){
      const countPrice = count * price_product;
      setTotalPrice(totalPrice => totalPrice = countPrice);
    }else{
      return price_product;
    }
  }, [count, price_product]);

  const handleRequestPost = () => {
    const addToCartProduct = {
      name:name_product,
      price:price_product,
      count: count,
      noted:noted,
      totalPrice:totalPrice,
      image:image_product
    }

    return fetch('http://localhost:5000/keranjang', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addToCartProduct),
    })
    .then(response => response.json())
    .then(data => {
      alert("data berhasil di simpan di keranjang");
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div className={styled.title_cart}>
        <h2>Atur jumlah dan catatan</h2>
      </div>
      <div className={styled.count_products}>
        <div className={styled.count_input_type}>
          <input type="text" name="count" value={count} onChange = {(e) => handleCounterProduct(e)}/>
          <div className={styled.add_count_product} onClick={() => handleAddCounter()}>
            <FontAwesomeIcon icon={['fas', 'plus']} size="xs" />
          </div>
          <div onClick={() => handleReduceCounter()} className={styled.reduce_count_product}>
            <FontAwesomeIcon icon={['fas', 'minus']} size="xs" />
          </div>
        </div>
        <div className={styled.sum_product}>
          <h2>Stok : <span> {count} </span></h2>
        </div>
      </div>
      <div className={styled.tambah_catatan}>
        {
          addNote === true ?
          <div>
            <input className={styled.noted_input} type="text" value={noted} onChange={(e) => handleNoted(e)} placeholder="Catatan barang yang dicari" />
            <h3 onClick={() => handleAddNote()}><FontAwesomeIcon icon={['fas', 'pencil-alt']} size="xs" />Batalkan Catatan</h3>
          </div>
          :
          <h3 onClick={() => handleAddNote()}><FontAwesomeIcon icon={['fas', 'pencil-alt']} size="xs" />Tambah Catatan</h3>
        }
      </div>
      <div className={styled.subtotal_product}>
        <div className={styled.title_subtotal}>
          <h3>Subtotal</h3>
        </div>
        <div className={styled.price_cart_product}>
          <h2>Rp.{totalPrice}</h2>
        </div>
      </div>
      <div className={styled.add_to_cart}>
        <button onClick={() => handleRequestPost()}>Add to Cart</button>
      </div>
    </div>
  )
}

export default CartProductsDetail;
