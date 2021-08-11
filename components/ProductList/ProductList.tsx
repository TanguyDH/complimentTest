import React, { useContext } from "react";
import styles from "./ProductList.module.scss";
import ProductItem from "./ProductItem/ProductItem";
import { ShopContext } from "../../context/shopContext";


const ProductList: React.FC = props => {
     const {products } = useContext(ShopContext)
    
  return <div className={styles.ProductList}>
         {products.map((item: any) => {
             return <ProductItem key={item.id} title={item.title} image={item.images[0].src} tags={item.tags} price={item.variants[0].price} variantId={item.variants[0].id}  />;
         })}
  </div>;
};

export default ProductList;
