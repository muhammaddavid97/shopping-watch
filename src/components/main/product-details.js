import React from "react";
import styled from "./product-details.module.css";
import {ProductDetailContext} from "../provider/Products.Provider";
import {useParams} from "react-router-dom";

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartProductsDetail from "./cart-products-detail";

library.add(faStar);


function ProductDetails(){
  const [detail_product, dispatch] = React.useContext(ProductDetailContext);
  const [image_list, setImageList] = React.useState({});
  const{id} = useParams();
  const ratings = [
      <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
      <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
      <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
      <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
      <FontAwesomeIcon icon={['fas', 'star']} size="xs" />
    ];

  React.useEffect(() => {
    function requestData(url){
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          dispatch({
            type:'detail_products',
            data:{
              id:data.id,
              name:data.name,
              price:data.price,
              images:data.image,
              status:data.status,
              descriptions:data.descriptions,
              detail_image:data.detail_image,
            }
          })
        })
        .catch(err => console.log(err.message));
    }

    requestData(`http://localhost:4000/products/${id}`);
  }, [dispatch]);

  const descriptionsProducts = {...detail_product.descriptions};
  const detailImageProducts = [...detail_product.detail_image];

  const handleClickImg = (id) => {
    const findIdImage = detailImageProducts.find(item => item.id === id);
    setImageList(findIdImage);
  }

  return (
    <section id={styled.product_details}>
      <div className={styled.image_product_details}>
        <div className={styled.image_product}>
          <img src={Object.values(image_list).length === 0 ? detail_product.images : image_list.image} alt="gambar produk" />
        </div>
        <div className={styled.list_image}>
          {
            detailImageProducts.map((item, indeks) => {
              return (
                <img key={indeks} src={item.image} onClick = {() => handleClickImg(item.id)} alt="list products" />
              )
            })
          }
        </div>
      </div>
      <div className={styled.information_product_detail}>
        <div className={styled.name_product}>
          <h2>{detail_product.name}</h2>
        </div>
        <div className={styled.rating_product_detail}>
          <div className={styled.status}>
            <span>Status : {detail_product.status}</span>
          </div>
          <div className={styled.rating}>
            {ratings.map(item => {
              return item;
            })}
          </div>
        </div>
        <div className={styled.price_product_detail}>
          <h2>Rp.{detail_product.price}</h2>
        </div>
        <div className={styled.detail}>
          <ul>
            <li><span>Kondisi</span> : {descriptionsProducts.kondisi}</li>
            <li><span>Berat</span> :  {descriptionsProducts.berat} Gram</li>
            <li><span>Kategori</span> : {descriptionsProducts.kategori}</li>
          </ul>
          <p>{descriptionsProducts.information_product}</p>
        </div>
      </div>
      <div className={styled.cart_product_detail}>
        <CartProductsDetail
          price_product = {detail_product.price}
          counter = {detail_product.count}
          name_product = {detail_product.name}
          image_product = {detail_product.images}
        />
      </div>
    </section>
  )
}

export default ProductDetails;
