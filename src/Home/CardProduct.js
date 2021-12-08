import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home Style/CardProducts.module.css";

function CardProducts({ products }) {
  return (
    <>
      <div className={styles.cardContainer}>
        {products.feturedProducts.map((product) => {
          return (
            <div key={product._id} className={styles.card}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.coverImage}
                  alt={product.title}
                  width='100%'
                  height='300px'
                  padding='20px'
                />
                <div style={{ height: "100px" }}>
                  <h4>{product.title}</h4>
                  <p>
                    <b> BD: {product.price}</b>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardProducts;
