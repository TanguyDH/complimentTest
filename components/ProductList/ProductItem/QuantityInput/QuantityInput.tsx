import React, { useContext } from "react";
import styles from "./QuantityInput.module.scss";
import { ShopContext } from "../../../../context/shopContext";


interface Props {
    quantity: number,
    variantId: string,
    checkoutItemId: string
};

const QuantityInput: React.FC<Props> = ({quantity, variantId, checkoutItemId}) => {
const { addItemToCheckout, removeLineItem } = useContext(ShopContext);





  return (
    <div className={styles.QuantityInput}>
      <span
        onClick={() => {
         if (navigator.onLine) {
           if (quantity === 1) {
             removeLineItem(checkoutItemId);
            } else {
             addItemToCheckout(variantId, -1);
           }
         }else {
             alert("tu es offline !");
         }
        }}
        className={styles.QuantityInput__icon}
      >
        -
      </span>
      <span className={styles.QuantityInput__quantity}>{quantity}</span>
      <span
        onClick={() => {
             if (navigator.onLine) {
               addItemToCheckout(variantId, 1);
             } else {
               alert("tu es offline !");
             }
        }}
        className={styles.QuantityInput__icon}
      >
        +
      </span>
    </div>
  );
};

export default QuantityInput;
