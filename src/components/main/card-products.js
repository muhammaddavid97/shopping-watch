import React from "react";
import styled from "./cards-products.module.css";
import {ProductsContext} from "../provider/Products.Provider";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, useRouteMatch} from "react-router-dom";

library.add(faStar);

function CardProducts(){

  const [cardProduct] = React.useContext(ProductsContext);

  const ratings = [
    <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
    <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
    <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
    <FontAwesomeIcon icon={['fas', 'star']} size="xs" />,
    <FontAwesomeIcon icon={['fas', 'star']} size="xs" />
  ];

  let match = useRouteMatch();

  return (
    <section id={styled.cards}>
      {
        cardProduct.map(item => {
          return (
            item.price > 0 ?
            <div className={styled.card_product}>
              <div className={styled.image_product}>
                <img src={item.images} alt={item.name} />
              </div>
              <div className={styled.information_product}>
                <div className={styled.name_product}>
                  <Link to={`${match.url}/` + item.id}>{item.name}</Link>
                </div>
                <div className={styled.rating_product}>
                  <div className={styled.rating_star}>
                    {ratings.map(item => {
                      return item
                    })}
                  </div>
                  <div className={styled.status}>
                    <span>{item.status}</span>
                  </div>
                </div>
                <div className={styled.price_product}>
                  <span>Rp.{item.price}</span>
                </div>
              </div>
            </div>
            :
            null
          )
        })
      }
    </section>
  )
}

export default CardProducts;
