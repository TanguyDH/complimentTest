import React, { useContext } from "react";
import styles from "./ProductItem.module.scss";
import { ShopContext } from "../../../context/shopContext";
import QuantityInput from './QuantityInput/QuantityInput';


type Tag = {
    value: string
}

interface Props {
  title: string,
  image: string,
  tags: Tag[],
  price: string
  variantId: string
};

const ProductItem: React.FC<Props> = ({title, image, tags, price, variantId}) => {
      const { addItemToCheckout, checkout } = useContext(ShopContext);

      const checkoutItem = checkout.lineItems && checkout.lineItems.find((i: any) =>  i.variant && i.variant.id === variantId)


  return (
    <div className={styles.ProductItem}>
      <img src={image} />
      <div className={styles.ProductItem__tag}>
        {tags.map(item => {
          return <span key={item.value}>{item.value}</span>;
        })}
      </div>
      <h3 className={styles.ProductItem__title}>{title}</h3>
      <ul className={styles.ProductItem__list}>
        <li>ingentes tibiaeque et histrionici gestus</li>
        <li> locum oratoris doctor artium ludicrarum accitur et bybliothe</li>
        <li>
          Quod cum ita sit, paucae domus studiorum seriis cultibus antea
          celebratae nunc l
        </li>
      </ul>
      <div className={styles.ProductItem__bottom}>
        <span className={styles.ProductItem__price}>{price}€</span>
        {checkoutItem && checkoutItem.quantity ? 
          <QuantityInput quantity={checkoutItem.quantity} variantId={variantId} checkoutItemId={checkoutItem.id} />
        : 
        <span onClick={() => {
           if (navigator.onLine) {
             addItemToCheckout(variantId, 1);
           } else {
             alert("tu es offline !");
           }
        }} className={styles.ProductItem__add}>ajouter</span>}
      </div>
    </div>
  );
};

export default ProductItem;
