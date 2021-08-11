import React, { useContext } from "react";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import logo from "../../public/full-logo-green.svg";
import {FiShoppingCart} from 'react-icons/fi';
import { ShopContext } from "../../context/shopContext";

type Props = {
  children: JSX.Element | JSX.Element[],
};

const Layout : React.FC<Props> = (props) => {
      const { checkout } = useContext(ShopContext);


     

    return (
      <div>
        <div className={styles.navigation}>
          <Image src={logo} alt="logo green" />
          <a href={checkout.lineItems && checkout.lineItems.length > 0 ? checkout.webUrl : ''}>
            <FiShoppingCart />{" "}
            <span>
             {checkout.lineItems ?  checkout.lineItems.reduce((a:any, b:any) => a + b.quantity, 0) : 0}
            </span>
          </a>
        </div>

        {props.children}

        <footer></footer>
      </div>
    );
}

export default Layout
